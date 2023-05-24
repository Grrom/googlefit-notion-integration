import fetch from "node-fetch";
import Variables from "../types/variables";
import ActivityType from "../types/activity-types";

export default class GoogleFitActivityService {
  // TODO: inherit from DailyService
  private activityCode: ActivityType;
  private variables: Variables;

  private readonly baseUri: string =
    "https://www.googleapis.com/fitness/v1/users/me/sessions";

  constructor(variables: Variables, activityCode: ActivityType) {
    this.activityCode = activityCode;
    this.variables = variables;
  }

  getActivityToday = async (start: string, end: string) => {
    let url = new URL(this.baseUri);

    url.searchParams.append("startTime", start);
    url.searchParams.append("endTime", end);
    url.searchParams.append("activityType", this.activityCode.toString());

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.variables.authToken}`,
      },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };
}
