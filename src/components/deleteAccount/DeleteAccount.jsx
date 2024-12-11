import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../../providers/AuthProvider.jsx";
import { logOutUser } from "../../utils/authFunctions.js";
import { IoWarning } from "react-icons/io5";
import { FaWindowClose } from "react-icons/fa";
import "./DeleteAccount.scss";

export default function DeleteAccount() {
  const { API, axios, setUserAuth } = useAuthProvider();
  const [deleteModal, setDeleteModal] = useState(false);

  // click on div outside buttons close modal
  function handleModalClick(e) {
    const className = e.target.className;
    if (className === "delete_modal flex-column-center") {
      setDeleteModal(false);
    }
  }

  //   delete account
  function handleDeleteAccount() {
    axios
      .delete(`${API}/auth/user`)
      .then(({ data }) => {
        logOutUser(setUserAuth);
        navigate("/auth");
      })
      .catch((err) => console.log("account deletion error", err));
  }

  return (
    <>
      {deleteModal && (
        <div
          className="delete_modal flex-column-center"
          onClick={(event) => handleModalClick(event)}
        >
          <FaWindowClose
            size={"2em"}
            color={"white"}
            onClick={() => setDeleteModal(false)}
          />
          <IoWarning size={"6em"} />
          <h2>Permanently Delete iCapital Budget Account?</h2>
          <p>
            This will:
            <li>Permanently delete all your transaction history</li>
            <li>Remove all your budget data</li>
            <li> Delete your account settings</li>
            <li> End your access to iCapital Budget</li>{" "}
          </p>

          <section className="delete_modal_buttons">
            <button
              className="delete_modal_buttons_delete"
              onClick={() => handleDeleteAccount()}
            >
              Yes! Delete Account
            </button>
            <button
              className="delete_modal_buttons_cancel"
              onClick={() => setDeleteModal(false)}
            >
              No! Cancel
            </button>
          </section>
        </div>
      )}
      <button className="delete_account" onClick={() => setDeleteModal(true)}>
        Delete Account
      </button>
    </>
  );
}
