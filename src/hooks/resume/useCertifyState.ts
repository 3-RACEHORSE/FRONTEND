import { useState } from "react";

const useCertifyState = () => {
  const [certify1, setCertify1] = useState<string>("");
  const [certify2, setCertify2] = useState<string>("");
  const [certify3, setCertify3] = useState<string>("");

  const handleCertifyChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCertify1(event.target.value);
  };

  const handleCertifyChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCertify2(event.target.value);
  };

  const handleCertifyChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCertify3(event.target.value);
  };

  return {
    certify1,
    certify2,
    certify3,
    handleCertifyChange1,
    handleCertifyChange2,
    handleCertifyChange3,
  };
};

export default useCertifyState;
