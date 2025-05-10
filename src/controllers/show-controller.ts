import { Request, Response } from "express";
import { Show } from "../models/Show.js";
import { OrderByDirection, Page } from "objection";

type SortOption = {
  column: string;
  order: OrderByDirection;
};

export async function getShow(req: Request, res: Response) {
  try {
    const data = await Show.query().findById(req.params.id);

    if (!data) {
      res.status(404).send("A show with this ID was not found.");
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getShows(req: Request, res: Response) {
  try {
    const search = req.query.search;
    const sort = req.query.sort;
    const page = req.query.page;
    const pageSize = req.query.pageSize;

    const query = Show.query();

    if (search) {
      query.whereILike("title", `%${search}%`);
    }

    if (typeof sort === "string" && sort?.length) {
      const sortArray = sort.split(",");

      const orderByArray: (SortOption | null)[] = sortArray.map((sort) => {
        const sortValues = sort.split(":");

        if (sortValues.length == 2) {
          return {
            column: sortValues[0],
            order: sortValues[1] as OrderByDirection,
          };
        }

        return null;
      });

      query.orderBy(
        orderByArray.filter((value): value is SortOption => Boolean(value))
      );
    }

    if (page != null && pageSize != null) {
      query.page(Number(page), Number(pageSize));
    }

    let data: Show[] | Page<Show> = await query;

    // Standardize the response structure
    if (page == null || pageSize == null) {
      data = { results: data, total: data.length };
    }

    res.status(200).json({ shows: data });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function insertShow(req: Request, res: Response) {
  try {
    if (req.body.id && (await Show.query().findById(req.body.id))) {
      res.status(409).send("A show with this ID already exists.");
      return;
    }

    const existingShow = await Show.query().findOne({
      title: req.body.title,
      season: req.body.season,
    });

    if (existingShow && existingShow.id !== req.body.id) {
      res.status(409).send("A show with this title and season already exists.");
      return;
    }

    const data = await Show.query().insert(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function upsertShow(req: Request, res: Response) {
  try {
    const existingShow = await Show.query().findOne({
      title: req.body.title,
      season: req.body.season,
    });

    if (existingShow && existingShow.id !== req.body.id) {
      res
        .status(409)
        .send("A show with this title and season already exists. (update)");

      return;
    }

    let data;

    if (await Show.query().findById(req.body.id)) {
      data = await Show.query().patchAndFetchById(req.body.id, req.body);
    } else {
      data = await Show.query().insert(req.body);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function deleteShow(req: Request, res: Response) {
  try {
    const data = await Show.query().deleteById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}
