import { reactive, computed } from 'vue';

export const store = reactive({
  applicants: [
    {
      id: 1,
      date: '10/24/2026 10:00 AM',
      name: 'Juan Dela Cruz',
      status: 'Pending',
      email: 'jcruz@gbox.adnu.edu.ph',
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      contactNumber: '09123456789',
      idNumber: '202600111',
      course: 'BSIT',
      affiliate: 'Student',
      vehicleType: 'Motorcycle',
      plateNumber: 'N1GG0808',
      model: 'Click125i',
      brand: 'Honda',
      gatepassAccessType: 'Easy Pass'
    },
    {
      id: 2,
      date: '10/25/2026 09:30 AM',
      name: 'Maria Clara',
      status: 'Approved',
      email: 'mclara@gbox.adnu.edu.ph',
      firstName: 'Maria',
      lastName: 'Clara',
      contactNumber: '09123456780',
      idNumber: '202600112',
      course: 'BSN',
      affiliate: 'Student',
      vehicleType: 'Car',
      plateNumber: 'ABC1234',
      model: 'Civic',
      brand: 'Honda',
      gatepassAccessType: 'Full Access'
    },
    {
      id: 3,
      date: '10/26/2026 08:15 AM',
      name: 'Jose Rizal',
      status: 'Rejected',
      email: 'jrizal@gbox.adnu.edu.ph',
      firstName: 'Jose',
      lastName: 'Rizal',
      contactNumber: '09187654321',
      idNumber: '202600113',
      course: 'BSCE',
      affiliate: 'Student',
      vehicleType: 'Motorcycle',
      plateNumber: 'XYZ9999',
      model: 'Mio',
      brand: 'Yamaha',
      gatepassAccessType: 'Easy Pass'
    },
    {
      id: 4,
      date: '10/27/2026 11:45 AM',
      name: 'Ana Santos',
      status: 'Pending',
      email: 'asantos@gbox.adnu.edu.ph',
      firstName: 'Ana',
      lastName: 'Santos',
      contactNumber: '09221234567',
      idNumber: '202600114',
      course: 'BSBA',
      affiliate: 'Student',
      vehicleType: 'Car',
      plateNumber: 'DEF5678',
      model: 'Vios',
      brand: 'Toyota',
      gatepassAccessType: 'Full Access'
    }
  ],
  auditLogs: [
    {
      id: 1,
      action: 'Approved',
      message: 'Application approved for Maria Clara',
      date: 'Oct 25, 2026'
    },
    {
      id: 2,
      action: 'Rejected',
      message: 'Application rejected for Jose Rizal',
      date: 'Oct 26, 2026'
    }
  ]
});

export const getters = {
  pendingCount:  computed(() => store.applicants.filter(a => a.status === 'Pending').length),
  approvedCount: computed(() => store.applicants.filter(a => a.status === 'Approved').length),
  resubmitCount: computed(() => store.applicants.filter(a => a.status === 'Rejected').length),
  totalCount:    computed(() => store.applicants.length)
};

export const actions = {
  updateStatus(id, newStatus) {
    const applicant = store.applicants.find(a => a.id === id);
    if (!applicant || applicant.status === newStatus) return;

    applicant.status = newStatus;

    // Add to audit log for Approve / Reject decisions
    if (newStatus === 'Approved' || newStatus === 'Rejected') {
      store.auditLogs.unshift({
        id: Date.now(),
        action: newStatus,
        message: `Application ${newStatus.toLowerCase()} for ${applicant.name}`,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric'
        })
      });
    }
  }
};
