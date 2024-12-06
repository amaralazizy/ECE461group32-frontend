import axios from "axios";

// const API_BASE_URL = "https://zy5br6rkxd.execute-api.us-east-1.amazonaws.com/prod";
const API_BASE_URL = "https://zy5br6rkxd.execute-api.us-east-1.amazonaws.com/front";
if (!localStorage.getItem("authToken")) {
  localStorage.setItem("authToken", "");
}
const authToken = localStorage.getItem("authToken");

export const registerUser = async (
  username: string,
  password: string,
  isAdministrator: boolean = false,
  permissions: string[],
  groups?: string[]
) => {
  try {
    console.log("Registering user...");
    const response = await axios.post(
      `${API_BASE_URL}/register`,
      {
        name: username,
        password: password,
        isAdmin: isAdministrator,
        permissions: permissions,
        groups: groups ?? []
      },
      {
        headers: {
          "X-Authorization": authToken,
          "Content-Type": "application/json"
        }
      }
    );
    if (response.status === 201 || response.status === 200) {
      console.log("User registered successfully.");
      return response.data;
    } else if (response.status === 400) {
      throw new Error("There is missing field(s) in the RegistrationRequest or it is formed improperly.");
    } else if (response.status === 409) {
      throw new Error("The user already exists.");
    } else {
      throw new Error(`An unknown error occurred. ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const authenticateUser = async (username: string, password: string, isAdministrator: boolean) => {
  try {
    console.log("Authenticating user...");
    const response = await axios.put(
      `${API_BASE_URL}/authenticate2`,
      {
        User: {
          name: username,
          isAdmin: isAdministrator
        },
        Secret: {
          password: password
        }
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (response.status === 200 || response.status === 201) {
      console.log("User authenticated successfully.");
      return response.data;
    } else if (response.status === 400) {
      throw new Error("There is missing field(s) in the AuthenticationRequest or it is formed improperly.");
    } else if (response.status === 401) {
      throw new Error("The user or password is invalid.");
    } else if (response.status === 501) {
      throw new Error("This system does not support authentication.");
    } else {
      throw new Error("An unknown error occurred.");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`, {
      headers: {
        "X-Authorization": authToken
      }
    });
    if (response.status === 200) {
      console.log("Users retrieved successfully.");
      return response.data;
    } else if (response.status === 403) {
      throw new Error("Authentication failed due to invalid or missing AuthenticationToken.");
    } else {
      throw new Error(`An unknown error occurred. ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getGroupsAndPermissions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/groups-permissions`, {
      headers: {
        "X-Authorization": authToken
      }
    });
    if (response.status === 200) {
      console.log("Groups retrieved successfully.");
      return response.data;
    } else if (response.status === 403) {
      throw new Error("Authentication failed due to invalid or missing AuthenticationToken.");
    } else {
      throw new Error(`An unknown error occurred. ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const addGroup = async (groupName: string, permissions: string[]) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/groups`,
      {
        name: groupName,
        permissions: permissions
      },
      {
        headers: {
          "X-Authorization": authToken,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Group added successfully.");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          throw new Error("There is missing field(s) in the GroupRequest or it is formed improperly.");
        } else if (status === 403) {
          throw new Error("Authentication failed due to invalid or missing AuthenticationToken.");
        } else if (status === 409) {
          throw new Error("The group already exists.");
        } else {
          throw new Error(
            `An unknown error occurred. Status: ${status}. Message: ${
              error.response.data?.message || "No message provided."
            }`
          );
        }
      } else if (error.request) {
        throw new Error("No response received from the server.");
      } else {
        throw new Error(error.message || "An error occurred while making the request.");
      }
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const getPackages = async (queryParams: object, offset?: number) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/packages`, queryParams, {
      params: { offset },
      headers: {
        "X-Authorization": authToken,
        "Content-Type": "application/json"
      }
    });
    if (response.status === 200) {
      console.log("Packages retrieved successfully.");
      return response.data;
    } else if (response.status === 400) {
      throw new Error("There is missing field(s) in the PackageQuery or it is formed improperly, or is invalid.");
    } else if (response.status === 403) {
      throw new Error("Authentication failed due to invalid or missing AuthenticationToken.");
    } else if (response.status === 413) {
      throw new Error("Too many packages returned.");
    } else {
      throw new Error(`An unknown error occurred. ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPackageById = async (packageId: string) => {
  try {
    console.log("From API", packageId);
    const response = await axios.get(`${API_BASE_URL}/package/${packageId}`, {
      headers: {
        "X-Authorization": authToken
      }
    });
    if (response.status === 200) {
      console.log("Package retrieved successfully.");
      return response.data;
    } else if (response.status === 400) {
      throw new Error("There is missing field(s) in the PackageID or it is formed improperly, or is invalid.");
    } else if (response.status === 403) {
      throw new Error("Authentication failed due to invalid or missing AuthenticationToken.");
    } else if (response.status === 404) {
      throw new Error("Package does not exist.");
    } else {
      throw new Error(`An unknown error occurred. ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatePackageById = async (packageId: string, packageData: object) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/package/${packageId}`, packageData, {
      headers: {
        id: packageId,
        "X-Authorization": authToken,
        "Content-Type": "application/json"
      }
    });
    if (response.status === 200) {
      console.log("Version is updated.");
      return response.data;
    } else if (response.status === 400) {
      throw new Error("There is missing field(s) in the PackageID or it is formed improperly, or is invalid.");
    } else if (response.status === 403) {
      throw new Error("Authentication failed due to invalid or missing AuthenticationToken.");
    } else if (response.status === 404) {
      throw new Error("Package does not exist.");
    } else {
      throw new Error(`An unknown error occurred. ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const resetRegistry = async (authToken: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/reset`, {
      headers: {
        "X-Authorization": authToken
      }
    });
    if (response.status === 200) {
      console.log("Registry is reset.");
      return response.data;
    } else if (response.status === 401) {
      throw new Error("You do not have permission to reset the registry.");
    } else if (response.status === 403) {
      throw new Error("Authentication failed due to invalid or missing AuthenticationToken.");
    } else {
      throw new Error(`An unknown error occurred. ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPackageRate = async (packageId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/package/${packageId}/rate`, {
      headers: {
        "X-Authorization": authToken
      }
    });
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 400) {
      throw new Error("There is missing field(s) in the PackageID");
    } else if (response.status === 403) {
      throw new Error("	Authentication failed due to invalid or missing AuthenticationToken.");
    } else if (response.status === 404) {
      throw new Error("Package does not exist.");
    } else if (response.status === 500) {
      throw new Error("The package rating system choked on at least one of the metrics.");
    } else {
      throw new Error(`An unknown error occurred. ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPackageCost = async (packageId: string, dependency: boolean = false) => {  
  try {
    const response = await axios.get(`${API_BASE_URL}/package/${packageId}/cost`, {
      params: { dependency },
      headers: {
        "X-Authorization": authToken
      }
    });
    if (response.status === 200) {
      const cost  = response.data[Object.keys(response.data)[0]].totalCost
      return cost;
    } else if (response.status === 400) {
      throw new Error("There is missing field(s) in the PackageID");
    } else if (response.status === 403) {
      throw new Error("Authentication failed due to invalid or missing AuthenticationToken.");
    } else if (response.status === 404) {
      throw new Error("Package does not exist.");
    } else if (response.status === 500) {
      throw new Error("The package rating system choked on at least one of the metrics.");
    } else {
      throw new Error(`An unknown error occurred. ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const searchPackagesByRegEx = async (regex: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/package/byRegEx`,
      { RegEx: regex },
      {
        headers: {
          "X-Authorization": authToken,
          "Content-Type": "application/json"
        }
      }
    );
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 400) {
      throw new Error("There is missing field(s) in the PackageRegEx or it is formed improperly, or is invalid");
    } else if (response.status === 403) {
      throw new Error("Authentication failed due to invalid or missing AuthenticationToken.");
    } else if (response.status === 404) {
      throw new Error("No package found under this regex.");
    } else {
      throw new Error(`An unknown error occurred. ${response.status}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw error;
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const getTracks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tracks`);
    if (response.status === 200) {
      console.log("Tracks retrieved successfully.");
      return response.data;
    } else if (response.status === 500) {
      throw new Error("The system encountered an error while retrieving the student's track information.");
    } else {
      throw new Error(`An unknown error occurred. ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};
export const uploadPackageByURL = async (JSProgram: string, url: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/package`,
      {
        JSProgram: JSProgram,
        URL: url
      },
      {
        headers: {
          "X-Authorization": authToken,
          "Content-Type": "application/json"
        }
      }
    );
    if (response.status === 200 || response.status === 201) {
      console.log("Success. Check the ID in the returned metadata for the official ID.");
      return response.data;
    } else if (response.status === 400) {
      throw new Error("There is missing field(s) in the PackageUpload or it is formed improperly, or is invalid.");
    } else if (response.status === 403) {
      throw new Error("Authentication failed due to invalid or missing AuthenticationToken.");
    } else if (response.status === 409) {
      throw new Error("Package exists already.");
    } else if (response.status === 424) {
      throw new Error("Package is not uploaded due to the disqualified rating.");
    } else {
      throw new Error(`An unknown error occurred. ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const uploadPackageByContent = async (content: string, JSProgram: string, debloat: boolean) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/package`,
      {
        Content: content,
        JSProgram: JSProgram,
        debloat: debloat
      },
      {
        headers: {
          "X-Authorization": authToken,
          "Content-Type": "application/json"
        }
      }
    );
    if (response.status === 200 || response.status === 201) {
      console.log("Success. Check the ID in the returned metadata for the official ID.");
      return response.data;
    } else if (response.status === 400) {
      throw new Error("There is missing field(s) in the PackageUpload or it is formed improperly, or is invalid.");
    } else if (response.status === 403) {
      throw new Error("Authentication failed due to invalid or missing AuthenticationToken.");
    } else if (response.status === 409) {
      throw new Error("Package exists already.");
    } else if (response.status === 424) {
      throw new Error("Package is not uploaded due to the disqualified rating.");
    } else {
      throw new Error(`An unknown error occurred. ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteGroup = async (groupId: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/groups/${groupId}`, {
      headers: {
        "X-Authorization": authToken
      }
    });
    if (response.status === 200) {
      console.log("Group deleted successfully.");
      return response.data;
    } else if (response.status === 400) {
      throw new Error("There is missing field(s) in the GroupID or it is formed improperly, or is invalid.");
    } else if (response.status === 403) {
      throw new Error("Authentication failed due to invalid or missing AuthenticationToken.");
    } else if (response.status === 404) {
      throw new Error("Group does not exist.");
    } else {
      throw new Error(`An unknown error occurred. ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};
