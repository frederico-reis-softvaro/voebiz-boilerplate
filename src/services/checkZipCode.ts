import axios from "axios";

const checkZipCode = async (zipCode: string, apiDomain: string) => {
  try {
    const { data } = await axios.get(`${apiDomain}/voebiz-utilities/v1/zipcode/check?zipcode=${zipCode}`);
    return data.ErrorDesc === "Success" && data;
  } catch (err) {
    return undefined;
  }
};

export { checkZipCode };
