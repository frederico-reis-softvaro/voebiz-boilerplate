/* eslint-disable prettier/prettier */
import axios from "axios";

const createMember = async (newMember: any, smilesToken: string, apiDomain: string) => {
  const newMemberData = JSON.stringify(newMember);
  const smilesCreateMemberUrl = `${apiDomain}${"/members/v1/members"}`;

  return axios
    .post(smilesCreateMemberUrl, newMemberData, {
      headers: {
        "X-Smiles-Token": smilesToken,
        "Content-Type": "application/json",
        Channel: "Web",
      },
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};
export { createMember };
