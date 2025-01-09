import {
  Dialog,
  DialogPanel
} from "@headlessui/react";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const url = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_imgBB_Secret_Key
}`;

const CompleteModal = ({ isOpen, setIsOpen, bid, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const handelSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const message = form.message.value;
    const image = form.doc.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const { data } = await axios.post(url, formData);
    if (data.data.display_url) {
      const completeOrderInfo = {
        buyerEmail: bid?.buyerEmail,
        sellerEmail: bid?.sellerEmail,
        jobId: bid?.jobId,
        bidId: bid?._id,
        message: message,
        image: data.data.display_url,
        date: new Date(),
        status: "Complete",
        price: bid?.offerPrice,
      };

      try {
        const res = await axiosSecure.post("/completeOrder", completeOrderInfo);
        console.log(res);
        if (res.data.insertedId) {
          toast.success("Your task is successfully completed");
          setIsOpen(false);
          refetch()
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className=" space-y-4 border-2 border-[#F9128F] bg-[#F9128F] bg-opacity-80 shadow-2xl p-12">
          <div>
            <form onSubmit={handelSubmit} className="space-y-3">
              <div>
                <label className="font-bold" htmlFor="message">
                  Message
                </label>{" "}
                <br />
                <textarea
                  name="message"
                  required
                  id=""
                  className="p-3 w-full h-56"
                  placeholder="Message"
                ></textarea>
              </div>
              <div>
                <input type="file" name="doc" id="" required />
              </div>

              <div className="flex gap-4">
                <input
                  className="btn bg-green-700 border-none font-bold"
                  type="submit"
                  value="Submit"
                />
                <button
                  className="btn bg-blue-600 border-none font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  Not Now
                </button>
              </div>
            </form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CompleteModal;