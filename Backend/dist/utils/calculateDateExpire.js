"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateExpirationDate = void 0;
const calculateExpirationDate = (enrolledDate, duration) => {
    const startDate = new Date(enrolledDate);
    switch (duration) {
        case "monthlyPackage":
            startDate.setMonth(startDate.getMonth() + 1);
            break;
        case "quarterlyPackage":
            startDate.setMonth(startDate.getMonth() + 3);
            break;
        case "yearlyPackage":
            startDate.setFullYear(startDate.getFullYear() + 1);
            break;
        default:
            break;
    }
    return startDate.toLocaleDateString("en-US"); // Formats date as MM/DD/YYYY
};
exports.calculateExpirationDate = calculateExpirationDate;
