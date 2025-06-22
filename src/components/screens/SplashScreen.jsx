// npm run dev でアプリを起動してください
// React + Vite + Tailwind CSS を使用しています

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../ui/Logo";
import LoadingBar from "../ui/LoadingBar";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 3秒後にアルバム選択画面へ自動遷移
    const timer = setTimeout(() => {
      setIsLoading(false);
      navigate("/albums");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* メインロゴ */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Logo size="large" />
          <h1 className="text-4xl font-bold mt-6 tracking-wider">NoteFlight</h1>
          <p className="text-gray-400 mt-2 text-lg">音楽と共に飛翔する</p>
        </div>
      </div>

      {/* ローディングバー */}
      <div className="pb-12 w-full max-w-md px-8">
        <LoadingBar isLoading={isLoading} />
      </div>
    </div>
  );
};

export default SplashScreen;
