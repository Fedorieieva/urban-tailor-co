-- CreateEnum for UserType
CREATE TYPE "UserType" AS ENUM ('admin', 'tailor', 'user');

-- CreateEnum for AppointmentStatus
CREATE TYPE "AppointmentStatus" AS ENUM ('pending', 'confirmed', 'in_progress', 'canceled', 'rescheduled', 'in_review');

-- Create User Table
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userType" "UserType" NOT NULL,
    "userAvatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Create Appointments Table
CREATE TABLE "Appointments" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appointmentDate" TIMESTAMP(3) NOT NULL,
    "orderType" TEXT NOT NULL,
    "tailoringItems" INTEGER NOT NULL,
    "comment" TEXT,
    "status" "AppointmentStatus" NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Appointments_pkey" PRIMARY KEY ("id")
);

-- Create Portfolios Table
CREATE TABLE "Portfolios" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tailorId" TEXT NOT NULL,
    "imgUrls" TEXT[] NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Portfolios_pkey" PRIMARY KEY ("id")
);

-- Create Reviews Table
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- Create Index on User Email
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- Add Foreign Key to Appointments Table with CASCADE on Delete
ALTER TABLE "Appointments"
    ADD CONSTRAINT "Appointments_customerId_fkey"
    FOREIGN KEY ("customerId") REFERENCES "User"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE;

-- Add Foreign Key to Portfolios Table with CASCADE on Delete
ALTER TABLE "Portfolios"
    ADD CONSTRAINT "Portfolios_tailorId_fkey"
    FOREIGN KEY ("tailorId") REFERENCES "User"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE;

-- Add Foreign Key to Reviews Table with CASCADE on Delete
ALTER TABLE "Reviews"
    ADD CONSTRAINT "Reviews_appointmentId_fkey"
    FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE;
