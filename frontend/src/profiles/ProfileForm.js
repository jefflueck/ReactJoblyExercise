import React, { useContext, useState } from 'react';
import Alert from '../common/Alert';
import JoblyApi from '../api/api';
import UserContext from '../auth/UserContext';

import useTimedMessage from '../hooks/useTimedMessage';

const ProfileForm = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    email: currentUser.email,
    password: '',
  });
  const [formErrors, setFormErrors] = useState([]);
  const [saveConfirmed, setSaveConfirmed] = useTimedMessage('Saved!', 1000);
  console.debug(
    'ProfileForm',
    'currentUser=',
    currentUser,
    'formData=',
    formData,
    'formErrors=',
    formErrors,
    'saveConfirmed=',
    saveConfirmed
  );

  async function handleSubmit(evt) {
    evt.preventDefault();
    let profileData = {
      first_name: formData.first_name || undefined,
      last_name: formData.last_name || undefined,
      email: formData.email || undefined,
      password: formData.password || undefined,
    };
    let username = currentUser.username;
    let updatedUser;
    try {
      let updatedUser = await JoblyApi.saveProfile(username, profileData);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }
    setFormData((fData) => ({
      ...fData,
      password: '',
    }));
    setFormErrors([]);
    setSaveConfirmed(true);

    setCurrentUser(updatedUser);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
    <div className="ProfileForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Profile</h3>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <p className="form-control-plaintext">{currentUser.username}</p>
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input
                  name="first_name"
                  className="form-control"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  name="last_name"
                  className="form-control"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Confirm password to make changes:</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>
              {formErrors.length ? (
                <Alert type="danger" messages={formErrors} />
              ) : null}

              {saveConfirmed ? (
                <Alert type="success" messages={['Updated successfully.']} />
              ) : null}

              <button
                type="submit"
                className="btn btn-primary float-right"
                onSubmit={handleSubmit}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
