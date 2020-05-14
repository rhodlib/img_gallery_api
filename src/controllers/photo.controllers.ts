import { Request, Response } from "express";
import Photo from "../models/Photo";
import path from "path";
import fs from "fs-extra";

export async function createPhoto(
    req: Request,
    res: Response
): Promise<Response> {
    const { title, description } = req.body;
    const newPhoto = {
        title,
        description,
        imagePath: req.file.path,
    };

    const photo = new Photo(newPhoto);

    const photoSaved = await photo.save();

    return res.status(200).send({
        message: "Photo upload successfully",
        photoSaved,
    });
}

export async function getPhotos(
    req: Request,
    res: Response
): Promise<Response> {
    const photos = await Photo.find();
    return res.json(photos);
}

export async function getPhoto(req: Request, res: Response): Promise<Response> {
    const photo = await Photo.findById(req.params.id);
    return res.json(photo);
}

export async function deletePhoto(
    req: Request,
    res: Response
): Promise<Response> {
    const photo = await Photo.findByIdAndDelete(req.params.id);
    if (photo) {
        await fs.unlink(path.resolve(photo.imagePath));
    }
    return res.json({ message: "Delete successfully", photo });
}

export async function updatePhoto(
    req: Request,
    res: Response
): Promise<Response> {
    const { title, description } = req.body;
    const updatedPhoto = await Photo.findByIdAndUpdate(
        req.params.id,
        {
            title,
            description,
        },
        { new: true }
    );
    return res.json({ message: "Update successfully", updatedPhoto });
}
