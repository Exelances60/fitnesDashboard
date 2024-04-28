"use server";

interface IRegisterAccount {
  peddingRegister:
    | {
        email: string;
        companyName: string;
        address: string;
        phone: string;
        ownerImage: string;
        _id: string;
        status: string;
      }
    | undefined;
  message: string;
  errorMessage: string;
}

export const fetchRegisterAccount = async (
  registerId: String
): Promise<IRegisterAccount> => {
  try {
    const response = await fetch(
      `${process.env.BACK_END_SERVICES}/auth/getPeddingRegister/${registerId}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      peddingRegister: undefined,
      message: "",
      errorMessage: error.message,
    };
  }
};
