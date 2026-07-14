<template>
  <div class="applicants-wrapper">

    <!-- ===================== LIST VIEW ===================== -->
    <template v-if="!selectedApplicant">
      <div class="search-row">
        <div class="search-pill">
          <div class="search-icon-circle">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <circle cx="7.5" cy="7.5" r="6" stroke="white" stroke-width="2"/>
              <path d="M12 12l4 4" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <input type="text" placeholder="Search here..." v-model="searchQuery" />
          <div class="count-badge">{{ filteredApplicants.length }}</div>
        </div>
      </div>

      <div class="table-section">
        <h2 class="table-title">APPLICANTS</h2>

        <div class="table">
          <div class="table-row header-row">
            <div class="col-datetime">DATE / TIME</div>
            <div class="col-name">NAME</div>
            <div class="col-status-header">STATUS</div>
            <div class="col-actions-header">ACTIONS</div>
          </div>

          <div
            v-for="applicant in filteredApplicants"
            :key="applicant.id"
            class="table-row data-row"
          >
            <div class="col-datetime">{{ applicant.date }}</div>
            <div class="col-name">{{ applicant.name }}</div>
            <div class="col-status">
              <span class="status-badge" :class="applicant.status.toLowerCase()">
                {{ applicant.status.toUpperCase() }}
              </span>
            </div>
            <div class="col-actions">
              <button class="action-btn view-btn" @click="viewApplicant(applicant)">VIEW</button>
            </div>
          </div>

          <div v-if="filteredApplicants.length === 0" class="empty-state">
            No applicants found.
          </div>
        </div>
      </div>
    </template>

    <!-- ===================== DETAIL VIEW ===================== -->
    <template v-else>
      <div class="search-row detail-search-row">
        <div class="search-pill">
          <div class="search-icon-circle">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <circle cx="7.5" cy="7.5" r="6" stroke="white" stroke-width="2"/>
              <path d="M12 12l4 4" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <input type="text" placeholder="Search here..." />
        </div>
        <button class="back-btn" @click="closeView">&larr; Back</button>
      </div>

      <div class="detail-scroll-container">

        <!-- Profile Header -->
        <div class="profile-row">
          <img
            class="profile-avatar"
            :src="`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(selectedApplicant.name)}`"
            alt="avatar"
          />
          <div class="profile-name-block">
            <div class="profile-name">{{ selectedApplicant.name }}</div>
            <div class="profile-role">Applicant</div>
          </div>
          <span class="detail-status-badge" :class="selectedApplicant.status.toLowerCase()">
            {{ selectedApplicant.status.toUpperCase() }}
          </span>
        </div>

        <!-- Applicant Information -->
        <div class="detail-section">
          <h3 class="detail-heading">Applicant Information</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Name</span>
              <span class="info-value">{{ selectedApplicant.firstName }} {{ selectedApplicant.lastName }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">ID Number</span>
              <span class="info-value">{{ selectedApplicant.idNumber || '—' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Email</span>
              <span class="info-value">{{ selectedApplicant.email || '—' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Course</span>
              <span class="info-value">{{ selectedApplicant.course || '—' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Contact No.</span>
              <span class="info-value">{{ selectedApplicant.contactNumber || '—' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Affiliation</span>
              <span class="info-value">{{ selectedApplicant.affiliate || '—' }}</span>
            </div>
          </div>
        </div>

        <!-- Vehicle Information -->
        <div class="detail-section">
          <h3 class="detail-heading">Vehicle Information</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Vehicle Type</span>
              <span class="info-value">{{ selectedApplicant.vehicleType || '—' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Brand</span>
              <span class="info-value">{{ selectedApplicant.brand || '—' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Model</span>
              <span class="info-value">{{ selectedApplicant.model || '—' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Plate No.</span>
              <span class="info-value">{{ selectedApplicant.plateNumber || '—' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Gate Pass Type</span>
              <span class="info-value">{{ selectedApplicant.gatepassAccessType || '—' }}</span>
            </div>
          </div>
        </div>

        <!-- Uploaded Requirements -->
        <div class="detail-section">
          <h3 class="detail-heading">Uploaded Requirements</h3>
          <div class="info-grid">
            <div class="requirement-item">
              <span class="req-title">Driver's License</span>
              <div class="req-links">
                <a href="#">[Preview]</a>
                <a href="#">[View]</a>
                <a href="#">[Download]</a>
              </div>
            </div>
            <div class="requirement-item">
              <span class="req-title">Official Receipt</span>
              <div class="req-links">
                <a href="#">[Preview]</a>
                <a href="#">[View]</a>
                <a href="#">[Download]</a>
              </div>
            </div>
            <div class="requirement-item">
              <span class="req-title">School ID</span>
              <div class="req-links">
                <a href="#">[Preview]</a>
                <a href="#">[View]</a>
                <a href="#">[Download]</a>
              </div>
            </div>
            <div class="requirement-item">
              <span class="req-title">Certificate of Registration</span>
              <div class="req-links">
                <a href="#">[Preview]</a>
                <a href="#">[View]</a>
                <a href="#">[Download]</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Guidelines & Pledge -->
        <div class="detail-section">
          <h3 class="detail-heading">Guidelines &amp; Pledge</h3>
          <div class="pledge-item">
            <div class="pledge-check-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 9l4 4 6-7" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="pledge-text">Agreed to Campus Traffic Management</span>
          </div>
          <div class="pledge-date">
            <span class="date-label">Accepted</span>
            <span class="date-value">{{ selectedApplicant.date }}</span>
          </div>
        </div>

        <!-- Admin Section -->
        <div class="detail-section">
          <h3 class="detail-heading">Admin Section</h3>
          <div class="info-grid admin-grid">
            <div class="info-item">
              <span class="info-label">Sticker Color</span>
              <span class="info-value">Yellow</span>
            </div>
            <div class="info-item">
              <span class="info-label">Validity</span>
              <span class="info-value">SY 2026–2027</span>
            </div>
          </div>

          <div class="admin-actions">
            <div class="action-row">
              <button
                class="btn-approve"
                :class="{ 'btn-active': selectedApplicant.status === 'Approved' }"
                @click="setStatus('Approved')"
              >
                <svg v-if="selectedApplicant.status === 'Approved'" width="15" height="15" viewBox="0 0 18 18" fill="none">
                  <path d="M4 9l4 4 6-7" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ selectedApplicant.status === 'Approved' ? 'Approved' : 'Approve' }}
              </button>
              <button
                class="btn-reject"
                :class="{ 'btn-active': selectedApplicant.status === 'Rejected' }"
                @click="setStatus('Rejected')"
              >
                <svg v-if="selectedApplicant.status === 'Rejected'" width="15" height="15" viewBox="0 0 18 18" fill="none">
                  <path d="M5 5l8 8M13 5l-8 8" stroke="white" stroke-width="2.2" stroke-linecap="round"/>
                </svg>
                {{ selectedApplicant.status === 'Rejected' ? 'Rejected' : 'Reject' }}
              </button>
            </div>
            <button
              class="btn-revise"
              :class="{ 'btn-active-revise': selectedApplicant.status === 'Pending' }"
              @click="setStatus('Pending')"
            >
              {{ selectedApplicant.status === 'Pending' ? '↩ Pending Review' : 'Request Revision' }}
            </button>
          </div>
        </div>

      </div>
    </template>

  </div>
</template>

<script>
import { API_BASE_URL } from '../config/api.js'
import { store, actions } from '../store'

export default {
  name: 'ApplicantsView',
  data() {
    return {
      searchQuery: ''
    }
  },
  async created() {
    await this.fetchApplicants()
  },
  computed: {
    applicants() {
      return store.applicants
    },
    filteredApplicants() {
      const q = this.searchQuery.toLowerCase()
      return this.applicants.filter(a =>
        a.name.toLowerCase().includes(q) ||
        String(a.id).includes(q) ||
        a.status.toLowerCase().includes(q)
      )
    },
    selectedApplicant() {
      return store.selectedApplicant || null
    }
  },
  methods: {
    async fetchApplicants() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/applications`)
        if (!response.ok) return
        const data = await response.json()
        // Replace store applicants with real backend data
        store.applicants = data.applications.map(a => ({
          id: a.id,
          date: a.date,
          name: a.name,
          status: a.status,
          // Detail fields — not yet in backend model, so left blank
          firstName: a.name.split(' ')[0] || '',
          lastName: a.name.split(' ').slice(1).join(' ') || '',
          email: '',
          contactNumber: '',
          idNumber: '',
          course: '',
          affiliate: '',
          vehicleType: '',
          brand: '',
          model: '',
          plateNumber: '',
          gatepassAccessType: ''
        }))
      } catch (error) {
        // Backend not running — use existing store dummy data silently
        console.warn('Backend unavailable, using local data.')
      }
    },
    viewApplicant(applicant) {
      store.selectedApplicant = applicant
    },
    closeView() {
      store.selectedApplicant = null
    },
    async setStatus(newStatus) {
      if (!this.selectedApplicant) return
      if (this.selectedApplicant.status === newStatus) return

      const applicant = this.selectedApplicant
      const previousStatus = applicant.status

      // Optimistic update in store immediately
      actions.updateStatus(applicant.id, newStatus)

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/applications/${applicant.id}/status`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
          }
        )
        if (!response.ok) {
          // Roll back if backend rejected it
          actions.updateStatus(applicant.id, previousStatus)
          console.error('Failed to update status on server.')
        }
      } catch (error) {
        // Backend not running — keep local update
        console.warn('Backend unavailable, status updated locally only.')
      }
    }
  }
}
</script>

<style scoped>
.applicants-wrapper {
  width: 100%;
  padding: 0;
}

/* ===================== SEARCH ROW ===================== */
.search-row {
  display: flex;
  align-items: center;
  margin-bottom: 28px;
}

.detail-search-row {
  justify-content: space-between;
  gap: 16px;
}

.search-pill {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border: 1.5px solid #e0e4ef;
  border-radius: 30px;
  padding: 6px 10px 6px 6px;
  width: 100%;
  max-width: 420px;
}

.search-icon-circle {
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: 50%;
  background: #2b3ab0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.search-pill input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 13px;
  color: #333;
  flex: 1;
  min-width: 0;
}

.search-pill input::placeholder { color: #a8adc2; }

.count-badge {
  background: #fff;
  border: 1.5px dashed #c6cbe0;
  border-radius: 30px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 700;
  color: #1a1a2e;
  min-width: 36px;
  text-align: center;
  flex-shrink: 0;
}

.back-btn {
  border: 1.5px dashed #c6cbe0;
  border-radius: 30px;
  background: #fff;
  padding: 9px 20px;
  font-size: 12.5px;
  font-weight: 700;
  color: #333;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  flex-shrink: 0;
}

.back-btn:hover {
  background: #2b3ab0;
  color: #fff;
  border-color: #2b3ab0;
}

/* ===================== TABLE ===================== */
.table-section { width: 100%; }

.table-title {
  font-size: 13px;
  font-weight: 800;
  color: #1a1a2e;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.table {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.table-row {
  display: grid;
  grid-template-columns: 180px 1fr 130px 110px;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.col-datetime {
  background: #fff;
  border: 1.5px solid #d8dce8;
  border-radius: 30px;
  padding: 10px 16px;
  text-align: center;
  font-size: 12.5px;
  font-weight: 600;
  color: #1a1a2e;
}

.col-name {
  background: #fff;
  border: 1.5px solid #d8dce8;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 500;
  color: #1a1a2e;
  text-align: center;
  box-sizing: border-box;
  width: 100%;
}

.col-status-header,
.col-actions-header {
  background: #fff;
  border: 1.5px solid #d8dce8;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.3px;
  color: #555;
  text-align: center;
  padding: 10px 12px;
  box-sizing: border-box;
  width: 100%;
}

.col-actions {
  display: flex;
  gap: 8px;
  width: 100%;
}

.col-status {
  display: flex;
  justify-content: center;
  width: 100%;
}

.header-row .col-datetime,
.header-row .col-name {
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
  color: #555;
}

/* Status badge in list */
.status-badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.4px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}
.status-badge.pending  { background: #f0f2f8; color: #555; border: 1.5px solid #d8dce8; }
.status-badge.approved { background: #dcfce7; color: #16a34a; border: 1.5px solid #bbf7d0; }
.status-badge.rejected { background: #fee2e2; color: #dc2626; border: 1.5px solid #fecaca; }

/* View button */
.action-btn {
  border: 1.5px dashed #c6cbe0;
  border-radius: 30px;
  background: #fff;
  padding: 7px 14px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  letter-spacing: 0.3px;
  color: #333;
}

.col-actions .action-btn {
  flex: 1;
  width: 100%;
  box-sizing: border-box;
}

.view-btn:hover {
  background: #2b3ab0;
  color: #fff;
  border-color: #2b3ab0;
}

.empty-state {
  text-align: center;
  padding: 30px;
  color: #aaa;
  font-size: 13px;
}

/* ===================== DETAIL VIEW ===================== */
.detail-scroll-container {
  height: calc(100vh - 140px);
  overflow-y: auto;
  padding-right: 8px;
  margin-top: 10px;
}

.detail-scroll-container::-webkit-scrollbar { width: 6px; }
.detail-scroll-container::-webkit-scrollbar-track { background: transparent; }
.detail-scroll-container::-webkit-scrollbar-thumb {
  background: #d0d4e8;
  border-radius: 6px;
}

.profile-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 30px;
}

.profile-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  background: #e8eaf6;
  border: 2px solid #e0e4ef;
}

.profile-name-block { flex: 1; }

.profile-name {
  font-size: 16px;
  font-weight: 800;
  color: #2b3ab0;
}

.profile-role {
  font-size: 12.5px;
  color: #8a8fa3;
  font-weight: 500;
}

/* Status badge in detail header */
.detail-status-badge {
  padding: 6px 18px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.4px;
  flex-shrink: 0;
}
.detail-status-badge.pending  { background: #f0f2f8; color: #555; }
.detail-status-badge.approved { background: #dcfce7; color: #16a34a; }
.detail-status-badge.rejected { background: #fee2e2; color: #dc2626; }

.detail-section { margin-bottom: 36px; }

.detail-heading {
  font-size: 17px;
  font-weight: 800;
  color: #3f4254;
  margin-bottom: 20px;
  padding-bottom: 8px;
  border-bottom: 1.5px solid #f0f2f8;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 32px;
}

.info-item { display: flex; flex-direction: column; }

.info-label {
  font-size: 11px;
  color: #a1a5b7;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 4px;
}

.info-value {
  font-size: 14px;
  color: #3f4254;
  font-weight: 700;
}

/* Requirements */
.requirement-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.req-title {
  font-size: 14px;
  font-weight: 700;
  color: #3f4254;
}

.req-links { display: flex; gap: 10px; }

.req-links a {
  font-size: 12px;
  color: #2b3ab0;
  font-weight: 700;
  text-decoration: none;
}

.req-links a:hover { text-decoration: underline; }

/* Pledge */
.pledge-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.pledge-check-icon {
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: 50%;
  background: #22c55e;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pledge-text {
  font-size: 14px;
  font-weight: 700;
  color: #3f4254;
}

.pledge-date {
  display: flex;
  flex-direction: column;
  margin-left: 46px;
}

.date-label {
  font-size: 11px;
  color: #a1a5b7;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 4px;
}

.date-value {
  font-size: 14px;
  font-weight: 700;
  color: #181c32;
}

/* Admin action buttons */
.admin-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.action-row { display: flex; gap: 12px; }

.btn-approve, .btn-reject, .btn-revise {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  border-radius: 24px;
  padding: 13px 24px;
  font-size: 13px;
  font-weight: 800;
  color: white;
  cursor: pointer;
  text-align: center;
  transition: opacity 0.2s, transform 0.1s, box-shadow 0.2s;
}

.btn-approve { background: #22c55e; flex: 1; }
.btn-approve:hover { opacity: 0.88; }
.btn-approve.btn-active { background: #16a34a; box-shadow: 0 0 0 3px #bbf7d0; }

.btn-reject { background: #ef4444; flex: 1; }
.btn-reject:hover { opacity: 0.88; }
.btn-reject.btn-active { background: #dc2626; box-shadow: 0 0 0 3px #fecaca; }

.btn-revise { background: #232c45; width: 100%; }
.btn-revise:hover { opacity: 0.88; }
.btn-revise.btn-active-revise { background: #f59e0b; box-shadow: 0 0 0 3px #fde68a; }

.btn-approve:active, .btn-reject:active, .btn-revise:active {
  transform: scale(0.97);
}

@media (max-width: 700px) {
  .info-grid { grid-template-columns: 1fr; gap: 16px; }
  .table-row { grid-template-columns: 1fr 1fr; gap: 8px; }
}
</style>
