import { NextFunction, Request, Response } from "express";
import { mailOptions, transport } from "../Services/emailService";
import { createPaymentConfirmationService } from "../Services/paymentConfirmatinService";

export const CreatePaymentConfirmation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { tableidentifier } = req.params;
    const confirm = await createPaymentConfirmationService(tableidentifier);
    
    // if (confirm) {
    //   const options = mailOptions(
    //     [`${confirm?.client}@mail.com`],
    //     'Confirmação do pedido',
    //     'email',
    //     {
    //       name: confirm?.client,
    //       total: confirm.finalPrice,
    //       nota_fiscal: confirm?.billId,
    //       orders: confirm?.orders
    //     }
    //   )

    //   transport.sendMail(options, (err, info) => {
    //     if (err) {
    //       return console.log(err)
    //     } else {
    //       console.log(info)
    //     }
    //   })
    // }

    return res.status(201).json(confirm);
  } catch (err) {
    next(err);
  }
};
