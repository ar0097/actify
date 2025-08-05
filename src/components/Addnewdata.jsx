import { nanoid } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addContact } from "../redux/slice";  // <-- Adjust path

function Addnewdata() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const submitHandler = (data) => {
    const newContact = { ...data, id: nanoid() };
    dispatch(addContact(newContact));
    reset();  
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="contact-form">
      <div className="form-row">
        <div className="form-group">
          <label>Contact Owner</label>
          <input {...register("contactOwner", { required: "Contact Owner is required" })} />
          {errors.contactOwner && <p className="error">{errors.contactOwner.message}</p>}
        </div>
        <div className="form-group">
          <label>Account Name</label>
          <input {...register("accountName", { required: "Account Name is required" })} />
          {errors.accountName && <p className="error">{errors.accountName.message}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Name</label>
          <input {...register("name", { required: "Name is required" })} />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            type="email"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Phone</label>
          <input
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^\+?[0-9]{7,15}$/,
                message: "Invalid phone number",
              },
            })}
          />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>
        <div className="form-group">
          <label>Created Date</label>
          <input {...register("createdDate", { required: "Created Date is required" })} type="date" />
          {errors.createdDate && <p className="error">{errors.createdDate.message}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Contact Log</label>
          <textarea {...register("contactLog", { required: "Contact Log is required" })}></textarea>
          {errors.contactLog && <p className="error">{errors.contactLog.message}</p>}
        </div>
        <div className="form-group">
          <label>Contact Source</label>
          <input {...register("contactSource", { required: "Contact Source is required" })} />
          {errors.contactSource && <p className="error">{errors.contactSource.message}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Contact Status</label>
          <select {...register("contactStatus", { required: "Contact Status is required" })}>
            <option value="">Select Status</option>
            <option value="New">New</option>
            <option value="Follow Up">Follow Up</option>
            <option value="Contacted">Contacted</option>
            <option value="Interested">Interested</option>
            <option value="No Response">No Response</option>
          </select>
          {errors.contactStatus && <p className="error">{errors.contactStatus.message}</p>}
        </div>
      </div>

      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
}

export default Addnewdata;
