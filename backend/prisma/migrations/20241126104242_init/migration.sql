-- CreateEnum for UserType
CREATE TYPE "UserType" AS ENUM ('admin', 'tailor', 'user');

-- CreateEnum for AppointmentStatus
CREATE TYPE "AppointmentStatus" AS ENUM ('pending', 'confirmed', 'in_progress', 'canceled', 'rescheduled', 'in_review');

-- Create User Table
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "userType" "UserType" NOT NULL,
    "userAvatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Appointments Table
CREATE TABLE "Appointments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appointmentDate" TEXT NOT NULL,
    "appointmentTime" TEXT NOT NULL,
    "orderType" TEXT NOT NULL,
    "tailoringItems" INTEGER NOT NULL,
    "comment" TEXT,
    "status" "AppointmentStatus" NOT NULL,
    "customerId" TEXT NOT NULL,
    "tailorId" TEXT,
    CONSTRAINT "Appointments_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Appointments_tailorId_fkey" FOREIGN KEY ("tailorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Create Portfolios Table
CREATE TABLE "Portfolios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tailorId" TEXT NOT NULL,
    "imgUrls" TEXT[] NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "Portfolios_tailorId_fkey" FOREIGN KEY ("tailorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create Reviews Table
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appointmentId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    CONSTRAINT "Reviews_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointments" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
