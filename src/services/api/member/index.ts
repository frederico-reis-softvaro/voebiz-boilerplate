import axios from "axios";

const createMember = async (newMember: any, smilesToken: string, apiDomain: string) => {
  const newMemberData = JSON.stringify(newMember);
  const smilesCreateMemberUrl = `${apiDomain}/members/v1/members`;

  return axios
    .post(smilesCreateMemberUrl, newMemberData, {
      headers: {
        "X-Smiles-Token": smilesToken,
        "Content-Type": "application/json",
        Channel: "Web",
      },
    })
    .then((response) => response)
    .catch((error) => error.response.data.data.error_code);
};

export { createMember };
