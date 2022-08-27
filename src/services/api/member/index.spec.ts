import axios from "axios";

import { createMember } from ".";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("member", () => {
  describe("createMember", () => {
    const createMemberStub = {
      newMember: { user: "SML User", email: "smluser@sml.com" },
      smlToken: "token",
      apiDomain: "domain",
    };

    it("should return valid CPF", async () => {
      mockedAxios.post.mockResolvedValue({ data: { message: "User created" } });
      const service = await createMember(
        createMemberStub.newMember,
        createMemberStub.smlToken,
        createMemberStub.apiDomain,
      );

      expect(service.data).toEqual({ message: "User created" });
    });
  });
});
