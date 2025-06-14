import { usernameRepoSchema } from "./usernameRepoSchema";

describe("usernameRepoSchema", () => {
  it("should pass valid username", () => {
    expect(() =>
      usernameRepoSchema.parse({ username: "valid-username123" })
    ).not.toThrow();
  });

  it("should fail on too short username", () => {
    expect(() =>
      usernameRepoSchema.parse({ username: "ab" })
    ).toThrow();
  });

  it("should fail on invalid characters", () => {
    expect(() =>
      usernameRepoSchema.parse({ username: "invalid_username!" })
    ).toThrow();
  });

  it("should fail on empty username", () => {
    expect(() =>
      usernameRepoSchema.parse({ username: "" })
    ).toThrow();
  });
});
