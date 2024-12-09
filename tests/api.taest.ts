// // import axios from "axios";
// // import { describe, it, expect, vi, afterEach } from "vitest";
// // import {
// //   registerUser,
// //   authenticateUser,
// //   getUsers,
// //   getGroupsAndPermissions,
// //   addGroup,
// //   getPackages,
// //   getPackageById,
// //   updatePackageById,
// //   resetRegistry,
// //   getPackageRate,
// //   getPackageCost,
// //   searchPackagesByRegEx,
// //   getTracks,
// //   uploadPackageByURL,
// //   uploadPackageByContent,
// //   deleteGroup
// // } from "../src/api";

// // vi.mock("axios");

// // const mockedAxios = axios as jest.Mocked<typeof axios>;

// // describe("API Functions", () => {
// //   afterEach(() => {
// //     vi.clearAllMocks();
// //   });

// //   it("should register a user successfully", async () => {
// //     mockedAxios.post.mockResolvedValueOnce({ status: 201, data: { message: "User registered" } });
// //     const response = await registerUser("testuser", "password", false, ["READ"], ["group1"]);
// //     expect(response).toEqual({ message: "User registered" });
// //     expect(mockedAxios.post).toHaveBeenCalledWith(
// //       expect.stringContaining("/register"),
// //       expect.any(Object),
// //       expect.any(Object)
// //     );
// //   });

// //   it("should authenticate a user successfully", async () => {
// //     mockedAxios.put.mockResolvedValueOnce({ status: 200, data: { token: "authToken" } });
// //     const response = await authenticateUser("testuser", "password", false);
// //     expect(response).toEqual({ token: "authToken" });
// //     expect(mockedAxios.put).toHaveBeenCalledWith(
// //       expect.stringContaining("/authenticate"),
// //       expect.any(Object),
// //       expect.any(Object)
// //     );
// //   });

// //   it("should get all users successfully", async () => {
// //     mockedAxios.get.mockResolvedValueOnce({ status: 200, data: [{ id: 1, name: "user1" }] });
// //     const response = await getUsers();
// //     expect(response).toEqual([{ id: 1, name: "user1" }]);
// //     expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining("/users"), expect.any(Object));
// //   });

// //   it("should get groups and permissions successfully", async () => {
// //     mockedAxios.get.mockResolvedValueOnce({ status: 200, data: { groups: ["group1"], permissions: ["READ"] } });
// //     const response = await getGroupsAndPermissions();
// //     expect(response).toEqual({ groups: ["group1"], permissions: ["READ"] });
// //     expect(mockedAxios.get).toHaveBeenCalledWith(
// //       expect.stringContaining("/users/groups-permissions"),
// //       expect.any(Object)
// //     );
// //   });

// //   it("should add a group successfully", async () => {
// //     mockedAxios.post.mockResolvedValueOnce({ status: 201, data: { message: "Group added" } });
// //     const response = await addGroup("group1", ["READ"]);
// //     expect(response).toEqual({ message: "Group added" });
// //     expect(mockedAxios.post).toHaveBeenCalledWith(
// //       expect.stringContaining("/groups"),
// //       expect.any(Object),
// //       expect.any(Object)
// //     );
// //   });

// //   it("should get packages successfully", async () => {
// //     mockedAxios.post.mockResolvedValueOnce({ status: 200, data: [{ id: 1, name: "package1" }] });
// //     const response = await getPackages({ query: "test" });
// //     expect(response).toEqual([{ id: 1, name: "package1" }]);
// //     expect(mockedAxios.post).toHaveBeenCalledWith(
// //       expect.stringContaining("/packages"),
// //       expect.any(Object),
// //       expect.any(Object)
// //     );
// //   });

// //   it("should get package by ID successfully", async () => {
// //     mockedAxios.get.mockResolvedValueOnce({ status: 200, data: { id: 1, name: "package1" } });
// //     const response = await getPackageById("1");
// //     expect(response).toEqual({ id: 1, name: "package1" });
// //     expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining("/package/1"), expect.any(Object));
// //   });

// //   it("should update package by ID successfully", async () => {
// //     mockedAxios.post.mockResolvedValueOnce({ status: 200, data: { message: "Package updated" } });
// //     const response = await updatePackageById("1", { name: "updatedPackage" });
// //     expect(response).toEqual({ message: "Package updated" });
// //     expect(mockedAxios.post).toHaveBeenCalledWith(
// //       expect.stringContaining("/package/1"),
// //       expect.any(Object),
// //       expect.any(Object)
// //     );
// //   });

// //   it("should reset registry successfully", async () => {
// //     mockedAxios.delete.mockResolvedValueOnce({ status: 200, data: { message: "Registry reset" } });
// //     const response = await resetRegistry("authToken");
// //     expect(response).toEqual({ message: "Registry reset" });
// //     expect(mockedAxios.delete).toHaveBeenCalledWith(expect.stringContaining("/reset"), expect.any(Object));
// //   });

// //   it("should get package rate successfully", async () => {
// //     mockedAxios.get.mockResolvedValueOnce({ status: 200, data: { rate: 5 } });
// //     const response = await getPackageRate("1");
// //     expect(response).toEqual({ rate: 5 });
// //     expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining("/package/1/rate"), expect.any(Object));
// //   });

// //   it("should get package cost successfully", async () => {
// //     mockedAxios.get.mockResolvedValueOnce({ status: 200, data: { "1": {totalCost: 100 }}});
// //     const response = await getPackageCost("1");
// //     expect(response).toEqual(100);
// //     expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining("/package/1/cost"), expect.any(Object));
// //   });

// //   it("should search packages by regex successfully", async () => {
// //     mockedAxios.post.mockResolvedValueOnce({ status: 200, data: [{ id: 1, name: "package1" }] });
// //     const response = await searchPackagesByRegEx("testRegex");
// //     expect(response).toEqual([{ id: 1, name: "package1" }]);
// //     expect(mockedAxios.post).toHaveBeenCalledWith(
// //       expect.stringContaining("/package/byRegEx"),
// //       expect.any(Object),
// //       expect.any(Object)
// //     );
// //   });

// //   it("should get tracks successfully", async () => {
// //     mockedAxios.get.mockResolvedValueOnce({ status: 200, data: [{ id: 1, name: "track1" }] });
// //     const response = await getTracks();
// //     expect(response).toEqual([{ id: 1, name: "track1" }]);
// //     expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining("/tracks"));
// //   });

// //   it("should upload package by URL successfully", async () => {
// //     mockedAxios.post.mockResolvedValueOnce({ status: 201, data: { message: "Package uploaded" } });
// //     const response = await uploadPackageByURL("test js program", "https://example.com");
// //     expect(response).toEqual({ message: "Package uploaded" });
// //     expect(mockedAxios.post).toHaveBeenCalledWith(
// //       expect.stringContaining("/package"),
// //       expect.any(Object),
// //       expect.any(Object)
// //     );
// //   });

// //   it("should upload package by content successfully", async () => {
// //     mockedAxios.post.mockResolvedValueOnce({ status: 201, data: { message: "Package uploaded" } });
// //     const response = await uploadPackageByContent("testContent", "test js program", false);
// //     expect(response).toEqual({ message: "Package uploaded" });
// //     expect(mockedAxios.post).toHaveBeenCalledWith(
// //       expect.stringContaining("/package"),
// //       expect.any(Object),
// //       expect.any(Object)
// //     );
// //   });

// //   it("should delete group successfully", async () => {
// //     mockedAxios.delete.mockResolvedValueOnce({ status: 200, data: { message: "Group deleted" } });
// //     const response = await deleteGroup(1);
// //     expect(response).toEqual({ message: "Group deleted" });
// //     expect(mockedAxios.delete).toHaveBeenCalledWith(expect.stringContaining("/groups/1"), expect.any(Object));
// //   });
// // });


// import { axiosInstance } from "../src/api"; // Mocking the Axios instance
// import axios from "axios"; // Mocking the Axios instance
// import { describe, it, expect, vi, afterEach } from "vitest";
// import {
//   registerUser,
//   // authenticateUser,
//   // getUsers,
//   // getGroupsAndPermissions,
//   // addGroup,
//   // getPackages,
//   // getPackageById,
//   // updatePackageById,
//   // resetRegistry,
//   // getPackageRate,
//   // getPackageCost,
//   // searchPackagesByRegEx,
//   // getTracks,
//   // uploadPackageByURL,
//   uploadPackageByContent,
//   // deleteGroup
// } from "../src/api";

// import { vi } from "vitest";
// import * as api from "../src/api";

// vi.mock("../src/api", async (importOriginal) => {
//   const actual = await importOriginal();
//   return {
//     ...actual,
//     axiosInstance: {
//       get: vi.fn(),
//       post: vi.fn(),
//       put: vi.fn(),
//       delete: vi.fn(),
//       interceptors: {
//         response: {
//           use: vi.fn() // Mock the interceptor to prevent real logic
//         }
//       }
//     }
//   };
// });



// const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

// describe("API Functions", () => {
//   afterEach(() => {
//     vi.clearAllMocks();
//   });

//   it("should register a user successfully", async () => {
//     mockedAxios.post.mockResolvedValueOnce({ status: 201, data: { message: "User registered" } });
//     const response = await registerUser("testuser", "password", false, ["READ"], ["group1"]);
//     expect(response).toEqual({ message: "User registered" });
//     expect(mockedAxios.post).toHaveBeenCalledWith(
//       expect.stringContaining("/register"),
//       expect.any(Object),
//       expect.any(Object)
//     );
//   });

//   it("should handle 403 response with modal and redirect", async () => {
//     mockedAxios.post.mockRejectedValueOnce({ response: { status: 403 } });
//     const consoleSpy = vi.spyOn(console, "log");
//     const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
//     const locationSpy = vi.spyOn(window.location, "href", "set");

//     try {
//       await registerUser("testuser", "password", false, ["READ"], ["group1"]);
//     } catch (error) {
//       // Verify modal/redirect behavior
//       expect(alertSpy).toHaveBeenCalledWith("Session expired. Redirecting to login...");
//       expect(locationSpy).toHaveBeenCalledWith("/login");
//     } finally {
//       consoleSpy.mockRestore();
//       alertSpy.mockRestore();
//       locationSpy.mockRestore();
//     }
//   });

//   // Repeat similar test updates for other methods if needed

//   it("should upload package by content successfully", async () => {
//     mockedAxios.post.mockResolvedValueOnce({ status: 201, data: { message: "Package uploaded" } });
//     const response = await uploadPackageByContent("testContent", "test js program", false);
//     expect(response).toEqual({ message: "Package uploaded" });
//     expect(mockedAxios.post).toHaveBeenCalledWith(
//       expect.stringContaining("/package"),
//       expect.any(Object),
//       expect.any(Object)
//     );
//   });

//   it("should handle 403 on package upload", async () => {
//     mockedAxios.post.mockRejectedValueOnce({ response: { status: 403 } });
//     const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
//     const locationSpy = vi.spyOn(window.location, "href", "set");

//     try {
//       await uploadPackageByContent("testContent", "test js program", false);
//     } catch (error) {
//       expect(alertSpy).toHaveBeenCalledWith("Session expired. Redirecting to login...");
//       expect(locationSpy).toHaveBeenCalledWith("/login");
//     } finally {
//       alertSpy.mockRestore();
//       locationSpy.mockRestore();
//     }
//   });
// });
