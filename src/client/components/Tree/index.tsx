import React, { useState } from "react";
import phone from './phone.svg';
import envelope from './envelope.svg';
import "./index.scss";

const Tree = ({ data = [] as any[] }) => {
  return (
    <div className="tree">
      <ul className="flex tree-container flex-column">
        {data.map((tree) => (
          <TreeNode key={tree._id} node={tree} />
        ))}
      </ul>
    </div>
  );
};

const TreeNode = ({ node = {
    _id: '',
    name: {
      first: '',
      last: '',
    },
    email: '',
    phone: '',
    picture: '',
    company: '',
    address: '',
    about: '',
    registered: '',
    children: [],
  } }) => {
  const [childVisible, setChildVisibility] = useState(false);

  const hasChild = node.children ? true : false;

  return (
    <li id={node._id} className="tree-node border-0">
      <div className="card" onClick={(e) => setChildVisibility((v) => !v)}>
        <div className="text-center card-body upper">
          {/* Profile picture */}
          <img src={node.picture} className="rounded-circle border picture" />
          {/* Full name */}
          <h4 className="card-title fullname">{node.name.first} {node.name.last}</h4>
          {/* Company */}
          <h5 className="card-text company">{node.company}</h5>
          {/* Address */}
          <h6 className="card-text address">{node.address}</h6>
          {/* Phone button */}
          <div className="rounded-circle border d-inline-block phone-container">
            <a href={"tel:" + node.phone}>
              <img src={phone} className="phone-icon"></img>
            </a>
          </div>
          {/* Email button */}
          <div className="rounded-circle border d-inline-block email-container">
            <a href={"mailto:" + node.email}>
              <img src={envelope} className="email-icon"></img>
            </a>
          </div>
        </div>
        <div className="card-body lower">
          <h6 className="card-text about-title">About</h6>
          {/* About */}
          <p style={{ fontSize: '1.2rem' }}>{node.about}</p>
          {/* Registered on */}
          <span className="float-end" style={{ fontSize: '0.6em', color: '#979797' }}>Registered on {node.registered}</span>
        </div>
        {/* Child element toggle */}
        {hasChild && (
          <div
            className={`inline tree-toggler ${
              childVisible ? "active" : ""
            }`}
          >
          </div>
        )}
      </div>
      {/* Child element */}
      {hasChild && childVisible && (
        <div className="tree-content">
          <ul className="flex tree-container flex-column">
            <Tree data={node.children} />
          </ul>
        </div>
      )}
    </li>
  );
};

export default Tree;