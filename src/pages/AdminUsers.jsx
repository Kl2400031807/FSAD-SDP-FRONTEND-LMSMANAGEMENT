import React from 'react';
import { users } from '../data/adminData';
import Navbar from '../components/Navbar';
import { Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminUsers = () => {
    // Group users by role for counts
    const roleStats = users.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
            <Navbar />
            <div className="container mx-auto max-w-4xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <Link to="/admin" className="flex items-center text-brand-primary font-medium mb-2 hover:underline">
                            <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center">
                            <Users className="mr-3 text-brand-primary" /> Manage Users
                        </h1>
                    </div>
                </div>

                {/* Role Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {Object.entries(roleStats).map(([role, count]) => (
                        <div key={role} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-slate-500 text-sm font-medium">{role}</p>
                            <p className="text-2xl font-bold text-slate-900">{count}</p>
                        </div>
                    ))}
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-bottom border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Name</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Role</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 text-slate-900 font-medium">{user.name}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                                            {user.role}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
