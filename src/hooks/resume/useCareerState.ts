import { useState } from "react";

const useCareerState = () => {
  const [career1, setCareer1] = useState<string>("");
  const [career2, setCareer2] = useState<string>("");
  const [career3, setCareer3] = useState<string>("");

  const handleCareerChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCareer1(event.target.value);
  };

  const handleCareerChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCareer2(event.target.value);
  };

  const handleCareerChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCareer3(event.target.value);
  };

  return {
    career1,
    career2,
    career3,
    handleCareerChange1,
    handleCareerChange2,
    handleCareerChange3,
  };
};

export default useCareerState;
