import member from "@/api/member";
import resource from "@/api/resource";
import { LoaderFunctionArgs } from "react-router-dom";

export interface UserLoaderParams {
  userID: string | undefined;
  userProfile: any;
  resources: any;
}

export async function userLoader({
  params,
}: LoaderFunctionArgs): Promise<UserLoaderParams> {
  console.log(params);
  const { userID } = params;
  const userProfile = await member.get(`${userID}`);
  const resources = await resource.getUser(`${userID}`);

  return { userProfile, resources, userID };
}
