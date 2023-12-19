import { NextFunction, Request, Response } from "express";
import { generatePassword, generateSalt } from "../utils";

import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";

export const FindVendor = async (id: String | undefined, email?: string) => {
  if (email) {
    return await Vendor.findOne({ email: email });
  } else {
    return await Vendor.findById(id);
  }
};

export const CreateVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    ownerName,
    foodType,
    pinCode,
    address,
    phone,
    email,
    password,
  } = req.body as CreateVendorInput;
  res.json({
    name,
    ownerName,
    foodType,
    pinCode,
    address,
    phone,
    email,
    password,
  });

  const existingVandor = await FindVendor("", email);

  if (existingVandor !== null) {
    return res.json({ message: "A vandor is exist with this email ID" });
  }

  //generate a salt, which is a random string

  const salt = await generateSalt();
  const userPassword = await generatePassword(password, salt);

  // encrypt the password using the salt

  const createdVandor = await Vendor.create({
    name: name,
    address: address,
    pinCode: pinCode,
    foodType: foodType,
    email: email,
    password: userPassword,
    salt: salt,
    ownerName: ownerName,
    phone: phone,
    rating: 0,
    serviceAvailable: false,
    coverImages: [],
    lat: 0,
    lng: 0,
  });

  return res.json(createdVandor);
};

export const GetVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const GetVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const GetVendorByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const GetTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const GetTransactionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const VerifyDeliveryUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const GetDeliveryUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
