import React from "react";
import { BiSolidContact } from "react-icons/bi";
import { FaHandshake } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { PiTrendUpFill } from "react-icons/pi";
import { RiAccountPinCircleFill, RiArrowDropDownLine } from "react-icons/ri";
import { VscFeedback } from "react-icons/vsc";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="dashboard">
        <MdDashboard size={20} />
        <p>Dashboard</p>
      </div>
      <div className="account">
        <div className="comman">
          <RiAccountPinCircleFill size={20} />
          <p>Account</p>
        </div>
        <RiArrowDropDownLine size={25} />
      </div>
      <div className="contact">
        <div className="comman">
          <BiSolidContact size={20} />

          <p>Contact</p>
        </div>
        <RiArrowDropDownLine size={25} />
      </div>
      <div className="leads">
        <div className="comman">
          <PiTrendUpFill size={20} />

          <p>Leads</p>
        </div>
        <RiArrowDropDownLine size={25} />
      </div>
      <div className="deals">
        <div className="comman">
          <FaHandshake size={20} />

          <p>Deals</p>
        </div>
        <RiArrowDropDownLine size={25} />
      </div>
      <div className="feedback">
        <VscFeedback size={20} />

        <p>Feadback List</p>
      </div>
    </div>
  );
}

export default Sidebar;
