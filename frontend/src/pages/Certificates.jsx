import React from 'react';
import Navbar from '../components/Navbar';

const Certificates = () => {
  // sample certificate data
  const certificates = [
    { title: 'React Fundamentals', issuer: 'EduFlow Academy', date: 'Jan 2026' },
    { title: 'Advanced JavaScript', issuer: 'CodeMaster', date: 'Dec 2025' },
    { title: 'UI/UX Design Basics', issuer: 'DesignPro', date: 'Nov 2025' },
  ];

  return (
    <div className="min-h-screen bg-surface-50 pt-32 pb-12 px-6">
      <Navbar />
      <div className="container mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
            My Certificates
          </h1>
          <p className="text-slate-500 font-medium">
            Here you can view all your earned certifications.
          </p>
        </header>

        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {cert.title}
                </h3>
                <p className="text-slate-600 font-medium mb-1">
                  Issued by {cert.issuer}
                </p>
                <p className="text-slate-500 text-sm">{cert.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-600">You have not earned any certificates yet.</p>
        )}
      </div>
    </div>
  );
};

export default Certificates;
