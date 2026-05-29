document.addEventListener('DOMContentLoaded', () => {

  // Global State Variables
  const token = localStorage.getItem('wanderlust_token');
  const role = localStorage.getItem('wanderlust_role');
  const adminUsername = localStorage.getItem('wanderlust_username') || 'Admin';

  let destinationsList = [];
  let ticketsList = [];
  let usersList = [];

  // ==========================================================================
  // 1. Security check: Ensure user is logged in as Admin
  // ==========================================================================
  if (!token || role !== 'admin') {
    document.body.innerHTML = `
      <div class="fixed inset-0 bg-[#020706] text-white flex flex-col justify-center items-center p-6 space-y-6 text-center">
        <span class="text-6xl animate-pulse">🔒</span>
        <h1 class="font-serif text-3xl text-gold">Access Denied</h1>
        <p class="text-sm text-gray-400 max-w-sm">You do not have permission to access the Administrator Panel. Redirecting to home page...</p>
        <div class="w-12 h-12 rounded-full border-t-2 border-r-2 border-gold animate-spin mt-4"></div>
      </div>
    `;
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 3000);
    return;
  }

  // Set admin name in sidebar
  const adminNameDisplay = document.getElementById('admin-username-display');
  if (adminNameDisplay) adminNameDisplay.textContent = adminUsername;

  // Restore active theme
  const savedTheme = localStorage.getItem('wanderlust-theme') || 'emerald';
  document.body.classList.remove('theme-sapphire', 'theme-sunset');
  if (savedTheme === 'sapphire') {
    document.body.classList.add('theme-sapphire');
  } else if (savedTheme === 'sunset') {
    document.body.classList.add('theme-sunset');
  }

  // ==========================================================================
  // 2. DOM Selectors
  // ==========================================================================
  const sidebarItems = document.querySelectorAll('.admin-sidebar-item');
  const sections = document.querySelectorAll('.admin-section');

  // Modal selectors
  const destModal = document.getElementById('dest-modal');
  const destModalClose = document.getElementById('dest-modal-close');
  const destForm = document.getElementById('dest-form');
  const destModalTitle = document.getElementById('dest-modal-title');
  const btnAddDestTrigger = document.getElementById('btn-add-dest-trigger');
  
  // Stats selectors
  const statDest = document.getElementById('stat-destinations');
  const statTick = document.getElementById('stat-tickets');
  const statRev = document.getElementById('stat-revenue');
  const statUsr = document.getElementById('stat-users');
  const recentBookingsList = document.getElementById('recent-bookings-list');

  // Lists selectors
  const adminDestinationsList = document.getElementById('admin-destinations-list');
  const adminTicketsList = document.getElementById('admin-tickets-list');
  const adminUsersList = document.getElementById('admin-users-list');
  const searchTicketsInput = document.getElementById('search-tickets');
  const btnLogout = document.getElementById('btn-admin-logout');

  // ==========================================================================
  // 3. Navigation page switching
  // ==========================================================================
  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.id.replace('nav-', 'section-');
      
      // Update active nav item styles
      sidebarItems.forEach(s => s.classList.remove('active'));
      item.classList.add('active');

      // Show target section and hide others
      sections.forEach(sec => {
        if (sec.id === targetId) {
          sec.classList.remove('hidden');
        } else {
          sec.classList.add('hidden');
        }
      });

      // Fetch fresh data when switching tabs
      if (targetId === 'section-dashboard') fetchDashboardData();
      if (targetId === 'section-destinations') fetchDestinationsData();
      if (targetId === 'section-tickets') fetchTicketsData();
      if (targetId === 'section-users') fetchUsersData();
    });
  });

  // Logout Handler
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      localStorage.removeItem('wanderlust_token');
      localStorage.removeItem('wanderlust_username');
      localStorage.removeItem('wanderlust_role');
      showToast('Logged out of Admin Panel.', 'info');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    });
  }

  // ==========================================================================
  // 4. API Request Handlers
  // ==========================================================================
  
  // Helper to format currency
  function formatINR(val) {
    return `₹${Number(val).toLocaleString('en-IN')}`;
  }

  // Custom Toast helper
  function showToast(message, type = 'success') {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    let typeClass = 'border-gold text-white bg-[#061f1a]';
    let icon = '✦';
    
    if (type === 'error') {
      typeClass = 'border-red-500 text-red-100 bg-red-950/90';
      icon = '✕';
    } else if (type === 'info') {
      typeClass = 'border-gold/40 text-gray-200 bg-[#0d382f]/90';
      icon = 'ℹ';
    }

    toast.className = `p-4 rounded-lg border glass-panel flex items-start gap-3 shadow-2xl transition-all duration-500 ease-out transform translate-y-10 opacity-0 ${typeClass}`;
    toast.innerHTML = `
      <span class="text-gold text-sm font-bold mt-0.5">${icon}</span>
      <div class="flex-1">
        <p class="text-xs font-semibold tracking-wide">${message}</p>
      </div>
      <button class="toast-close text-gray-500 hover:text-white text-xs ml-2">&times;</button>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('translate-y-10', 'opacity-0');
    }, 50);

    const removeTimer = setTimeout(() => {
      dismissToast(toast);
    }, 4000);

    toast.querySelector('.toast-close').addEventListener('click', () => {
      clearTimeout(removeTimer);
      dismissToast(toast);
    });
  }

  function dismissToast(toast) {
    toast.classList.add('translate-y-10', 'opacity-0');
    setTimeout(() => {
      toast.remove();
    }, 500);
  }

  // A. Fetch Dashboard Data
  async function fetchDashboardData() {
    try {
      const res = await fetch('/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (data.success) {
        statDest.textContent = data.stats.totalDestinations;
        statTick.textContent = data.stats.totalTickets;
        statRev.textContent = formatINR(data.stats.totalRevenue);
        statUsr.textContent = data.stats.totalUsers;

        // Fetch recent bookings (limit to 5)
        const ticketRes = await fetch('/api/tickets', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const ticketData = await ticketRes.json();
        
        if (ticketData.data) {
          ticketsList = ticketData.data;
          renderRecentBookings(ticketsList.slice(0, 5));
        }
      } else {
        showToast(data.error || 'Failed to load dashboard metrics.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error loading dashboard statistics.', 'error');
    }
  }

  function renderRecentBookings(tickets) {
    if (!recentBookingsList) return;
    
    if (tickets.length === 0) {
      recentBookingsList.innerHTML = `
        <tr>
          <td colspan="4" class="py-4 text-center text-gray-500 font-light">No bookings found in database yet.</td>
        </tr>
      `;
      return;
    }

    recentBookingsList.innerHTML = tickets.map(ticket => `
      <tr class="hover:bg-gold/5 transition-colors">
        <td class="py-3 font-mono text-gold font-bold">${ticket.ticketNumber}</td>
        <td class="py-3 font-semibold">${ticket.name}</td>
        <td class="py-3 text-gray-400 font-light">${ticket.destinationName}</td>
        <td class="py-3 text-right font-mono font-bold text-white">${formatINR(ticket.estimatedBudget)}</td>
      </tr>
    `).join('');
  }

  // B. Fetch Destinations Catalog
  async function fetchDestinationsData() {
    try {
      const res = await fetch('/api/destinations');
      const result = await res.json();
      destinationsList = result.data || [];
      renderDestinationsTable(destinationsList);
    } catch (err) {
      console.error(err);
      showToast('Network error fetching destinations.', 'error');
    }
  }

  function renderDestinationsTable(destinations) {
    if (!adminDestinationsList) return;

    if (destinations.length === 0) {
      adminDestinationsList.innerHTML = `
        <tr>
          <td colspan="5" class="py-6 text-center text-gray-500 font-light">No destinations found in the database. Click "+ Add New Destination" to create one.</td>
        </tr>
      `;
      return;
    }

    adminDestinationsList.innerHTML = destinations.map(dest => `
      <tr class="hover:bg-gold/5 transition-colors">
        <td class="py-3">
          <img src="${dest.image || 'assets/images/india_jaipur.png'}" alt="${dest.name}" class="w-12 h-8 object-cover rounded border border-gold/10">
        </td>
        <td class="py-3 font-bold text-white">${dest.name}</td>
        <td class="py-3 capitalize text-gray-400">${dest.category === 'india' ? 'India' : 'World'}</td>
        <td class="py-3 font-mono font-semibold text-gold">${formatINR(dest.minBudget)}</td>
        <td class="py-3 text-center space-x-2">
          <button class="btn-edit border border-gold/40 hover:bg-gold/10 text-gold px-3 py-1 rounded text-[10px] uppercase font-bold transition-all" data-id="${dest._id}">Edit</button>
          <button class="btn-delete border border-red-500/40 hover:bg-red-500/10 text-red-400 px-3 py-1 rounded text-[10px] uppercase font-bold transition-all" data-id="${dest._id}">Delete</button>
        </td>
      </tr>
    `).join('');

    // Bind edit/delete triggers
    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', () => openEditModal(btn.dataset.id));
    });
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', () => handleDeleteDestination(btn.dataset.id));
    });
  }

  // C. Fetch Booked Tickets
  async function fetchTicketsData() {
    try {
      const res = await fetch('/api/tickets', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await res.json();
      ticketsList = result.data || [];
      renderTicketsTable(ticketsList);
    } catch (err) {
      console.error(err);
      showToast('Network error fetching booked tickets.', 'error');
    }
  }

  function renderTicketsTable(tickets) {
    if (!adminTicketsList) return;

    if (tickets.length === 0) {
      adminTicketsList.innerHTML = `
        <tr>
          <td colspan="7" class="py-6 text-center text-gray-500 font-light">No boarding tickets found in database.</td>
        </tr>
      `;
      return;
    }

    adminTicketsList.innerHTML = tickets.map(ticket => `
      <tr class="hover:bg-gold/5 transition-colors">
        <td class="py-3 font-mono text-gold font-bold">${ticket.ticketNumber}</td>
        <td class="py-3 font-semibold text-white">${ticket.name}</td>
        <td class="py-3 text-gray-400 font-light">${ticket.email}</td>
        <td class="py-3 font-semibold">${ticket.destinationName}</td>
        <td class="py-3 font-light text-gray-400">${ticket.durationDays} Days / ${ticket.totalTravelers} Guest(s)</td>
        <td class="py-3 uppercase tracking-wider text-[10px] text-gold font-bold">${ticket.serviceLevel}</td>
        <td class="py-3 text-right font-mono font-bold text-white">${formatINR(ticket.estimatedBudget)}</td>
      </tr>
    `).join('');
  }

  // D. Fetch Users List
  async function fetchUsersData() {
    try {
      const res = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await res.json();
      usersList = result.users || [];
      renderUsersTable(usersList);
    } catch (err) {
      console.error(err);
      showToast('Network error fetching user profiles.', 'error');
    }
  }

  function renderUsersTable(users) {
    if (!adminUsersList) return;

    if (users.length === 0) {
      adminUsersList.innerHTML = `
        <tr>
          <td colspan="5" class="py-6 text-center text-gray-500 font-light">No users found.</td>
        </tr>
      `;
      return;
    }

    adminUsersList.innerHTML = users.map(user => {
      const roleBadge = user.role === 'admin' 
        ? `<span class="bg-gold/10 border border-gold/45 text-gold text-[9px] uppercase px-2 py-0.5 rounded font-bold">Admin</span>`
        : `<span class="bg-emerald-light/20 border border-emerald/30 text-gray-400 text-[9px] uppercase px-2 py-0.5 rounded">User</span>`;

      const regDate = new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      return `
        <tr class="hover:bg-gold/5 transition-colors">
          <td class="py-3 font-semibold text-white">${user.username}</td>
          <td class="py-3 text-gray-400 font-light">${user.email}</td>
          <td class="py-3">${roleBadge}</td>
          <td class="py-3 font-light text-gray-400">${regDate}</td>
          <td class="py-3 text-center">
            <button class="btn-delete-user border border-red-500/40 hover:bg-red-500/10 text-red-400 px-3 py-1 rounded text-[10px] uppercase font-bold transition-all" data-id="${user._id}">Delete</button>
          </td>
        </tr>
      `;
    }).join('');

    // Bind delete user triggers
    document.querySelectorAll('.btn-delete-user').forEach(btn => {
      btn.addEventListener('click', () => handleDeleteUser(btn.dataset.id));
    });
  }

  // ==========================================================================
  // 5. CRUD Destination Modal & Submission Actions
  // ==========================================================================
  
  // Open modal for new destination
  if (btnAddDestTrigger) {
    btnAddDestTrigger.addEventListener('click', () => {
      if (destForm) destForm.reset();
      document.getElementById('dest-mongo-id').value = '';
      document.getElementById('dest-id').removeAttribute('disabled');
      
      destModalTitle.textContent = 'Add New Destination';
      destModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  }

  // Close modal
  if (destModalClose) {
    destModalClose.addEventListener('click', () => {
      destModal.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  // Open modal for editing destination
  function openEditModal(mongoId) {
    const dest = destinationsList.find(d => d._id === mongoId);
    if (!dest) return;

    if (destForm) destForm.reset();

    // Populate Fields
    document.getElementById('dest-mongo-id').value = dest._id;
    
    const idField = document.getElementById('dest-id');
    idField.value = dest.id;
    idField.setAttribute('disabled', 'true'); // unique code cannot be modified

    document.getElementById('dest-name').value = dest.name;
    document.getElementById('dest-category').value = dest.category;
    document.getElementById('dest-tagline').value = dest.tagline;
    document.getElementById('dest-image').value = dest.image;
    document.getElementById('dest-tags').value = (dest.tags || []).join(', ');
    document.getElementById('dest-description').value = dest.description;
    
    // Pricing Stay
    document.getElementById('cost-stay-std').value = dest.baseCosts?.standard || 0;
    document.getElementById('cost-stay-prem').value = dest.baseCosts?.premium || 0;
    document.getElementById('cost-stay-lux').value = dest.baseCosts?.luxury || 0;

    // Pricing Activities
    document.getElementById('cost-act-std').value = dest.activityCosts?.standard || 0;
    document.getElementById('cost-act-prem').value = dest.activityCosts?.premium || 0;
    document.getElementById('cost-act-lux').value = dest.activityCosts?.luxury || 0;

    document.getElementById('dest-minbudget').value = dest.minBudget || 0;
    document.getElementById('dest-attractions').value = (dest.attractions || []).join(', ');

    // Daily Itinerary
    document.getElementById('itinerary-day-1').value = dest.dailyItinerary?.[1] || '';
    document.getElementById('itinerary-day-2').value = dest.dailyItinerary?.[2] || '';
    document.getElementById('itinerary-day-3').value = dest.dailyItinerary?.[3] || '';
    document.getElementById('itinerary-day-4').value = dest.dailyItinerary?.[4] || '';
    document.getElementById('itinerary-day-5').value = dest.dailyItinerary?.[5] || '';

    destModalTitle.textContent = 'Edit Destination details';
    destModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  // Handle Form Submission (Add or Edit)
  if (destForm) {
    destForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const mongoId = document.getElementById('dest-mongo-id').value;
      const destId = document.getElementById('dest-id').value.trim();
      const destName = document.getElementById('dest-name').value.trim();
      const destCategory = document.getElementById('dest-category').value;
      const destTagline = document.getElementById('dest-tagline').value.trim();
      const destImage = document.getElementById('dest-image').value.trim();
      
      const tagsArray = document.getElementById('dest-tags').value.split(',').map(t => t.trim()).filter(Boolean);
      const destDescription = document.getElementById('dest-description').value.trim();
      const destMinBudget = parseInt(document.getElementById('dest-minbudget').value);
      const attractionsArray = document.getElementById('dest-attractions').value.split(',').map(a => a.trim()).filter(Boolean);

      const dailyItinerary = {
        1: document.getElementById('itinerary-day-1').value.trim(),
        2: document.getElementById('itinerary-day-2').value.trim(),
        3: document.getElementById('itinerary-day-3').value.trim()
      };
      
      const day4 = document.getElementById('itinerary-day-4').value.trim();
      const day5 = document.getElementById('itinerary-day-5').value.trim();
      if (day4) dailyItinerary[4] = day4;
      if (day5) dailyItinerary[5] = day5;

      const payload = {
        id: destId,
        name: destName,
        category: destCategory,
        tags: tagsArray,
        image: destImage,
        tagline: destTagline,
        description: destDescription,
        minBudget: destMinBudget,
        baseCosts: {
          standard: parseInt(document.getElementById('cost-stay-std').value),
          premium: parseInt(document.getElementById('cost-stay-prem').value),
          luxury: parseInt(document.getElementById('cost-stay-lux').value)
        },
        activityCosts: {
          standard: parseInt(document.getElementById('cost-act-std').value),
          premium: parseInt(document.getElementById('cost-act-prem').value),
          luxury: parseInt(document.getElementById('cost-act-lux').value)
        },
        attractions: attractionsArray,
        dailyItinerary
      };

      const isEditing = !!mongoId;
      const url = isEditing ? `/api/destinations/${mongoId}` : '/api/destinations';
      const method = isEditing ? 'PUT' : 'POST';

      showToast(isEditing ? 'Updating destination details...' : 'Creating new destination...', 'info');

      try {
        const res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        
        if (data.success) {
          showToast(isEditing ? 'Destination updated successfully!' : 'Destination created successfully!', 'success');
          destModal.classList.add('hidden');
          document.body.style.overflow = '';
          fetchDestinationsData(); // reload catalog
        } else {
          showToast(data.error || 'Operation failed.', 'error');
        }
      } catch (err) {
        console.error(err);
        showToast('Network connection failed.', 'error');
      }
    });
  }

  // Handle Delete Destination
  async function handleDeleteDestination(mongoId) {
    const dest = destinationsList.find(d => d._id === mongoId);
    if (!dest) return;

    if (!confirm(`Are you absolutely sure you want to delete destination: "${dest.name}"? This action cannot be undone.`)) {
      return;
    }

    showToast('Deleting destination entry...', 'info');

    try {
      const res = await fetch(`/api/destinations/${mongoId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();

      if (data.success) {
        showToast('Destination deleted successfully!', 'success');
        fetchDestinationsData();
      } else {
        showToast(data.error || 'Deletion failed.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network connection failed during deletion.', 'error');
    }
  }

  // Handle Delete User account
  async function handleDeleteUser(userId) {
    const user = usersList.find(u => u._id === userId);
    if (!user) return;

    if (!confirm(`Are you sure you want to delete user account: "${user.username}"?`)) {
      return;
    }

    showToast('Deleting user profile...', 'info');

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();

      if (data.success) {
        showToast('User account deleted successfully.', 'success');
        fetchUsersData();
      } else {
        showToast(data.error || 'Failed to delete user profile.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error during user deletion.', 'error');
    }
  }

  // Search filter on Booked Tickets
  if (searchTicketsInput) {
    searchTicketsInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const filtered = ticketsList.filter(ticket => 
        ticket.ticketNumber.toLowerCase().includes(query) ||
        ticket.name.toLowerCase().includes(query) ||
        ticket.email.toLowerCase().includes(query) ||
        ticket.destinationName.toLowerCase().includes(query)
      );
      renderTicketsTable(filtered);
    });
  }

  // ==========================================================================
  // 6. Application Bootstrap
  // ==========================================================================
  fetchDashboardData();

});
