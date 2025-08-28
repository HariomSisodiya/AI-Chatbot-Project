"use client";

import React, { useMemo } from "react";
import "../App.css";

const AumCard = ({ currentAum, previousAum, currency = "₹" }) => {
  // Format currency dynamically
  const formatCurrency = (amount) => {
    if (amount >= 10000000) return `${currency}${(amount / 10000000).toFixed(2)}Cr`;
    if (amount >= 100000) return `${currency}${(amount / 100000).toFixed(2)}L`;
    if (amount >= 1000) return `${currency}${(amount / 1000).toFixed(2)}K`;
    return `${currency}${amount.toLocaleString()}`;
  };

  // Memoize calculations for performance
  const growth = useMemo(() => {
    if (!previousAum || previousAum === 0) return null;
    return ((currentAum - previousAum) / previousAum) * 100;
  }, [currentAum, previousAum]);

  const badgeClasses = growth >= 0
    ? "bg-success bg-opacity-25 text-success"
    : "bg-danger bg-opacity-25 text-danger";

  return (
    <div className="card border-0 shadow-lg position-relative overflow-hidden rounded-4 aum-card mt-3 mb-3">
      {/* Background Pattern */}
      <div className="pattern"></div>

      <div className="card-body p-4 position-relative z-10">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div className="d-flex align-items-center">
            <div className="icon-circle me-3">
              <span className="text-white fs-4">₹</span>
            </div>
            <div>
              <h5 className="text-white mb-1 fw-semibold">Assets Under Management</h5>
              <small className="text-white-50">Current Portfolio Value</small>
            </div>
          </div>

          {growth !== null && (
            <div className={`badge rounded-pill px-3 py-2 d-flex align-items-center ${badgeClasses}`}>
              <svg
                className="me-1"
                width="14"
                height="14"
                fill="currentColor"
                viewBox="0 0 20 20"
                style={{ transform: growth >= 0 ? "rotate(0deg)" : "rotate(180deg)" }}
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="fw-bold">{Math.abs(growth).toFixed(1)}%</span>
            </div>
          )}
        </div>

        {/* Main AUM Value */}
        <div className="mb-4">
          <div className="display-3 fw-bold text-white mb-2">{formatCurrency(currentAum)}</div>
        </div>

        {/* Bottom Stats */}
        <div className="d-flex justify-content-between align-items-end">
          <div className="d-flex gap-4">
            <div className="text-center">
              <div className="text-white-50 small">This Month</div>
              <div className="text-white fw-semibold">
                {growth !== null ? `${growth >= 0 ? "+" : ""}${growth.toFixed(1)}%` : "N/A"}
              </div>
            </div>
            {previousAum && (
              <div className="text-center">
                <div className="text-white-50 small">Previous</div>
                <div className="text-white fw-semibold">{formatCurrency(previousAum)}</div>
              </div>
            )}
          </div>

          <div className="icon-circle-small">
            <svg className="text-white" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Shine Effect */}
      <div className="shine"></div>
    </div>
  );
};

export default AumCard;
