import React from "react";
import QRCode from "qrcode.react";
import Link from "next/link";

const ShowRegisterProcesQRCode = ({ qrCodeID }: { qrCodeID: string }) => {
  return (
    <>
      <p>Scan the QR code to track your registration process</p>
      <p>Or click the link below</p>
      <Link href={`/register/${qrCodeID}`}>Going to the registration page</Link>
      <QRCode value={`http://localhost:3000/register/${qrCodeID}`} />
      <p>QR Code ID: {qrCodeID}</p>
      <p>If you want to you can downland the QR Code on right click</p>
    </>
  );
};

export default ShowRegisterProcesQRCode;
