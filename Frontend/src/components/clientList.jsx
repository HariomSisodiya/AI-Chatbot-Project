"use client";

import { useState, useEffect } from "react";

export default function ClientList({ client }) {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    setClients(client && Array.isArray(client) ? client : sampleClients);
  }, [client]);

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const getAvatarColor = (name) => {
    const colors = [
      "bg-primary",
      "bg-success",
      "bg-info",
      "bg-warning",
      "bg-danger",
      "bg-secondary",
      "bg-dark",
    ];
    return colors[name.length % colors.length];
  };

  return (
    <>
      <div className="mb-3 mt-3">
        <div className="card client-card">
          {/* Header */}
          <div className="card-header card-header-custom d-flex justify-content-between align-items-center">
            <h4 className="mb-0 fw-bold">Client List</h4>
            <span className="badge client-count-badge rounded-pill">
              {clients.length} {clients.length === 1 ? "Client" : "Clients"}
            </span>
          </div>

          {/* Table or Empty State */}
          <div className="card-body p-0">
            {clients.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👥</div>
                <h5 className="text-muted fw-bold">No clients found</h5>
                <p className="text-muted mb-0">
                  Start building your client network today
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-custom mb-0">
                  <thead>
                    <tr>
                      <th>Client Information</th>
                      <th>Contact Details</th>
                      <th>PAN Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((c) => (
                      <tr key={c._id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div
                              className={`client-avatar ${getAvatarColor(
                                c.name
                              )} me-3`}
                            >
                              {getInitials(c.name)}
                            </div>
                            <div>
                              <h6 className="mb-1 fw-bold">{c.name}</h6>
                              <small className="text-muted">
                                ID: {c._id}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <div className="mb-1 text-primary">{c.email}</div>
                            <div className="text-muted">{c.mobile}</div>
                          </div>
                        </td>
                        <td>
                          <span className="badge pan-badge">{c.panNo}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
