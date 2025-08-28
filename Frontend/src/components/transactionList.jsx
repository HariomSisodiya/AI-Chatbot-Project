"use client";

import { useState, useEffect } from "react";

export default function TransactionList({ transaction }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions(
      transaction && Array.isArray(transaction) ? transaction : []
    );
  }, [transaction]);

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const getAvatarColor = (name = "") => {
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
    <div className="mb-3 mt-3">
      <div className="card client-card">
        {/* Header */}
        <div className="card-header card-header-custom d-flex justify-content-between align-items-center">
          <h4 className="mb-0 fw-bold">Transaction List</h4>
          <span className="badge client-count-badge rounded-pill">
            {transactions.length}{" "}
            {transactions.length === 1 ? "Transaction" : "Transactions"}
          </span>
        </div>

        {/* Table or Empty State */}
        <div className="card-body p-0">
          {transactions.length === 0 ? (
            <div className="empty-state text-center p-4">
              <div className="empty-icon">📑</div>
              <h5 className="text-muted fw-bold">No transactions found</h5>
              <p className="text-muted mb-0">Start by adding new transactions</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-custom mb-0">
                <thead>
                  <tr>
                    <th style={{ whiteSpace: "nowrap", minWidth: "200px" }}>
                      Fund Name
                    </th>
                    <th>Nav Price</th>
                    <th>Fund Type</th>
                    <th>Folio Number</th>
                    <th>Scheme Code</th>
                    <th>Transaction ID</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t._id}>
                      <td style={{ whiteSpace: "nowrap" }}>
                        <div className="d-flex align-items-center">
                          <div
                            className={`client-avatar ${getAvatarColor(
                              t.fundDesc
                            )} me-3`}
                          >
                            {getInitials(t.fundDesc)}
                          </div>
                          <div>
                            <h6
                              className="mb-1 fw-bold text-truncate"
                              style={{ maxWidth: "180px" }}
                            >
                              {t.fundDesc}
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="mb-1 text-dark">
                          {Number(t.price).toFixed(2)}
                        </div>
                      </td>
                      <td>
                        <div className="mb-1 text-primary">{t.data_type}</div>
                      </td>
                      <td>
                        <span className="badge pan-badge">{t.folioNumber}</span>
                      </td>
                      <td>
                        <div className="mb-1 text-dark">{t.schemeCode}</div>
                      </td>
                      <td>
                        <span
                          className="text-dark text-truncate d-block"
                          style={{ maxWidth: "150px" }}
                        >
                          {t._id}
                        </span>
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
  );
}
