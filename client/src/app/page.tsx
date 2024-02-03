import LoginPageForm from "@/components/LoginPageForm";
import SvgComp from "@/components/SvgComp";

export default function LoginPage() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-[#4880FF] overflow-hidden">
      <div className="w-[350px]  md:w-[630px] md:h-[700px] h-[600px] bg-white rounded-[20px] flex flex-col gap-[15px] items-center justify-center z-20">
        <h1 className="text-3xl font-bold">Login the Account</h1>
        <p className="text-[#6E7191]">Enter your email and password to login</p>
        <LoginPageForm />
      </div>
      <SvgComp />
    </div>
  );
}
