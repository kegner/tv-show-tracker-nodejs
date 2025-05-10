import { JSONSchema, Model } from "objection";

export class Show extends Model {
  id: string | null | undefined = undefined;
  title: string | null = null;
  season: number | null = null;
  startDate: string | null = null;
  endDate: string | null = null;
  watchStatus: string | null = null;
  seriesStatus: string | null = null;
  platform: string | null = null;
  score: number | null = null;

  static get tableName() {
    return "shows";
  }

  static get jsonSchema(): JSONSchema {
    return {
      type: "object",
      properties: {
        id: { type: ["string", "null"] },
        title: { type: ["string", "null"] },
        season: { type: ["number", "null"] },
        startDate: { type: ["string", "null"] },
        endDate: { type: ["string", "null"] },
        watchStatus: { type: ["string", "null"] },
        seriesStatus: { type: ["string", "null"] },
        platform: { type: ["string", "null"] },
        score: { type: ["number", "null"] },
      },
    };
  }
}
