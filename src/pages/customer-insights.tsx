import React from 'react';

import Layout from '@/components/Layout';

const customerData = [
  {
    name: 'Sarah Johnson',
    segment: 'Growth',
    riskScore: 62,
    lastContact: '2026-03-28',
    advisor: 'M. Peters',
  },
  {
    name: 'David Nkosi',
    segment: 'Conservative',
    riskScore: 31,
    lastContact: '2026-04-01',
    advisor: 'L. van Wyk',
  },
  {
    name: 'Priya Chetty',
    segment: 'Aggressive',
    riskScore: 84,
    lastContact: '2026-03-15',
    advisor: 'M. Peters',
  },
  {
    name: 'James Mokoena',
    segment: 'Growth',
    riskScore: 55,
    lastContact: '2026-04-03',
    advisor: 'T. Dlamini',
  },
  {
    name: 'Fatima Abrahams',
    segment: 'Conservative',
    riskScore: 28,
    lastContact: '2026-03-20',
    advisor: 'L. van Wyk',
  },
];

const segments = [
  { label: 'Conservative', percentage: 35, color: 'bg-blue-500' },
  { label: 'Growth', percentage: 40, color: 'bg-green-500' },
  { label: 'Aggressive', percentage: 25, color: 'bg-orange-500' },
];

const InConstructionBanner: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <div
    className={`rounded-md bg-amber-50 border border-amber-300 px-4 py-2 text-sm text-amber-800 ${className}`}
  >
    🚧 In Construction — This feature is under development
  </div>
);

const CustomerInsightsPage: React.FC = () => {
  return (
    <Layout pageTitle="Customer Insights" includeFooter={false}>
      <main className="w-full flex flex-col container h-screen-[calc(100%-4rem)]">
        <div className="relative flex-grow bg-white mt-[4rem] sm:mt-[4rem]">
          <div className="mx-auto max-w-6xl mb-12 mt-4 p-4">
            {/* Page Title */}
            <h1 className="text-2xl font-bold text-text-primary mb-4">
              Customer Insights
            </h1>

            {/* Top Banner */}
            <InConstructionBanner className="mb-6" />

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* LEFT column */}
              <div className="flex flex-col gap-6">
                {/* Customer Data Card */}
                <div className="bg-white rounded-card shadow-card border border-border p-6">
                  <h2 className="text-lg font-semibold text-text-primary mb-4">
                    Customer Data
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-text-body">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 pr-3 font-medium text-text-primary">
                            Name
                          </th>
                          <th className="text-left py-2 pr-3 font-medium text-text-primary">
                            Segment
                          </th>
                          <th className="text-left py-2 pr-3 font-medium text-text-primary">
                            Risk Score
                          </th>
                          <th className="text-left py-2 pr-3 font-medium text-text-primary">
                            Last Contact
                          </th>
                          <th className="text-left py-2 font-medium text-text-primary">
                            Advisor
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {customerData.map((customer, index) => (
                          <tr
                            key={index}
                            className="border-b border-border last:border-b-0"
                          >
                            <td className="py-2 pr-3">{customer.name}</td>
                            <td className="py-2 pr-3">{customer.segment}</td>
                            <td className="py-2 pr-3">{customer.riskScore}</td>
                            <td className="py-2 pr-3">
                              {customer.lastContact}
                            </td>
                            <td className="py-2">{customer.advisor}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Segmentation Card */}
                <div className="bg-white rounded-card shadow-card border border-border p-6">
                  <h2 className="text-lg font-semibold text-text-primary mb-4">
                    Segmentation
                  </h2>
                  <div className="space-y-4">
                    {segments.map((segment) => (
                      <div key={segment.label}>
                        <div className="flex justify-between text-sm text-text-body mb-1">
                          <span>{segment.label}</span>
                          <span className="font-medium">
                            {segment.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3">
                          <div
                            className={`${segment.color} h-3 rounded-full`}
                            style={{ width: `${segment.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT column */}
              <div className="flex flex-col gap-6">
                {/* Next Best Action Card */}
                <div className="bg-white rounded-card shadow-card border border-border p-6">
                  <h2 className="text-lg font-semibold text-text-primary mb-4">
                    Next Best Action
                  </h2>
                  <p className="text-text-body mb-3">
                    NBA engine integration pending
                  </p>
                  <InConstructionBanner />
                </div>

                {/* Needs Analysis Card */}
                <div className="bg-white rounded-card shadow-card border border-border p-6">
                  <h2 className="text-lg font-semibold text-text-primary mb-4">
                    Needs Analysis
                  </h2>
                  <p className="text-text-body mb-3">
                    Financial needs analysis module pending
                  </p>
                  <InConstructionBanner />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default CustomerInsightsPage;
