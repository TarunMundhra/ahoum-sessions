const Dashboard = ({ user }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
      <p className="text-gray-600">
        Hello, <span className="font-semibold text-blue-600">{user?.email}</span>! 
        This page is protected by your AuthLayout.
      </p>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="font-medium text-blue-800">Your Booked Sessions</h3>
        <p className="text-sm text-blue-600 mt-1">Coming soon: We'll fetch your specific bookings from the API next.</p>
      </div>
    </div>
  );
};

export default Dashboard;