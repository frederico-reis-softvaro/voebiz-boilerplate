import axios from "axios";

const getListOfValues = async (apiDomain: string) => {
  try {
    const response = await axios.get(`${apiDomain}/voebiz-utilities/v1/values/list`);
    const { data } = response;
    return data;
  } catch (error) {
    return [];
  }
};

export { getListOfValues };
