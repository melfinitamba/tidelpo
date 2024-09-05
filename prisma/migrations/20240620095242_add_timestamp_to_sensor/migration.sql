-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "device_code" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sensor" (
    "id" SERIAL NOT NULL,
    "device_code" TEXT NOT NULL,
    "sens_soil" DOUBLE PRECISION NOT NULL,
    "sens_pressure" DOUBLE PRECISION NOT NULL,
    "sens_tilt" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sensor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_device_code_key" ON "Device"("device_code");

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_device_code_fkey" FOREIGN KEY ("device_code") REFERENCES "Device"("device_code") ON DELETE RESTRICT ON UPDATE CASCADE;
