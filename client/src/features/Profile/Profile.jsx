import React, { useEffect, useState } from 'react'
import { Input, FormObserver, Loading, Button, FormRadioButton } from '../common/Elements'
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { clearProfileUpdate, updateProfile } from './profileSlice';
import { toast  } from 'react-toastify';



export const Profile = () => {
    const [editMode, setEditMode] = useState(false);
    const [formValues, setFormValues] = useState(null);
    const user = useSelector(state => state.login.user)
    const profileUpdateStatus = useSelector(state => state.profile.update)
    const dispatch = useDispatch();
    useEffect(() => {
        if (user === null) {
            return;
        }
        setFormValues({ ...user });
    }, [user]);
    useEffect(() => {
        if(!editMode) {
            return;
        }
        if(profileUpdateStatus.isSuccess) {
            toast('update successful')
        }
        if(profileUpdateStatus.isError) {
            toast.error('update failed')
        }
    }, [editMode, profileUpdateStatus.isSuccess, profileUpdateStatus.isError])

    const onUpdate = (value) => {
        setFormValues({ ...formValues, ...value });
    };
    const onSave = (value) => {
        dispatch(updateProfile(formValues));
    };

    const toggleEditMode = () => {
        dispatch(clearProfileUpdate());
        setEditMode(!editMode);
    }
    // console.log('formValues', formValues);
    if (formValues === null) {
        return (
            <div className="w-full border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 ">
                <div className="w-full bg-white rounded-md pt-2">
                    <Loading />
                </div>
            </div>
        )
    }
    return (
        <div className="w-full border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 flex flex-1">
            <div className="w-full bg-white rounded-md p-4 flex-1">
                <div className="w-full flex justify-end ">

                    <Button
                        size="xl"
                        color={editMode ? "error" : "primary"}
                        callback={toggleEditMode}
                    >{editMode ? 'Cancel Edit' : 'Start Editing'}
                    </Button>
                </div>
                <Formik
                    initialValues={formValues}
                    onSubmit={onSave}

                >
                    <Form className="space-y-4 flex-1 w-full px-4 flex flex-col sm:justify-center items-center">
                        <FormObserver watch={onUpdate} />
                        <div className="sm:w-1/3 w-full">
                            <Input
                                disabled={!editMode}
                                isform
                                label="Name"
                                type="text"
                                name="first_name"
                                placeholder="Enter a your name"
                            />
                        </div>
                        <div className="sm:w-1/3 w-full">
                            <Input
                                disabled={!editMode}
                                isform
                                label="Surname"
                                type="text"
                                name="last_name"
                                placeholder="Enter a your surname"
                            />
                        </div>
                        <div className="sm:w-1/3 w-full">
                            <Input
                                disabled={!editMode}
                                isform
                                label="Email"
                                type="email"
                                name="email"
                                placeholder="Enter a your email"
                            />
                        </div>
                        <div className="sm:w-1/3 w-full">
                            <Input
                                disabled={!editMode}
                                isform
                                label="Weight"
                                type="number"
                                name="weight"
                                placeholder="Enter a your weight"
                            />
                        </div>
                        <div className="sm:w-1/3 w-full">
                            <Input
                                disabled={!editMode}
                                isform
                                label="Height"
                                type="number"
                                name="height"
                                placeholder="Enter a your height"
                            />
                        </div>
                        {/* <table className='sm:w-1/3 w-full'>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <label className='flex items-center'>
                                            <input className='mr-2' type="radio" name="blood" value="0+" />
                                            <span>0 +</span>
                                        </label>
                                    </td>
                                    <td>
                                        <label className='flex items-center'>
                                            <input className='mr-2' type="radio" name="blood" value="A+" />
                                            <span>A +</span>
                                        </label>
                                    </td>
                                    <td>
                                        <label className='flex items-center'>
                                            <input className='mr-2' type="radio" name="blood" value="B+" />
                                            <span>B +</span>
                                        </label>
                                    </td>
                                    <td>
                                        <label className='flex items-center'>
                                            <input className='mr-2' type="radio" name="blood" value="AB+" />
                                            <span>AB +</span>
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className='flex items-center'>
                                            <input className='mr-2' type="radio" name="blood" value="0-" />
                                            <span>0 -</span>
                                        </label>
                                    </td>
                                    <td>
                                        <label className='flex items-center'>
                                            <input className='mr-2' type="radio" name="blood" value="A-" />
                                            <span>A -</span>
                                        </label>
                                    </td>
                                    <td>
                                        <label className='flex items-center'>
                                            <input className='mr-2' type="radio" name="blood" value="B-" />
                                            <span>B -</span>
                                        </label>
                                    </td>
                                    <td>
                                        <label className='flex items-center'>
                                            <input className='mr-2' type="radio" name="blood" value="AB-" />
                                            <span>AB -</span>
                                        </label>
                                    </td>
                                </tr>
                            </tbody>
                        </table> */}
                        <FormRadioButton
                            isform
                            className="sm:w-1/3 w-full"
                            disabled={!editMode}
                            items={[
                                { label: "Female", value: "Female" },
                                { label: "Male", value: "Male" },
                            ]}
                            name="gender"
                            label="Gender"
                        />
                        <FormRadioButton
                            isform
                            className="sm:w-1/3 w-full"
                            disabled={!editMode}
                            items={[
                                { label: "0 Rh+", value: "0 Rh+" },
                                { label: "0 Rh-", value: "0 Rh-" },
                                { label: "A Rh+", value: "A Rh+" },
                                { label: "A Rh-", value: "A Rh-" },
                                { label: "B Rh+", value: "B Rh+" },
                                { label: "B Rh-", value: "B Rh-" },
                                { label: "AB Rh+", value: "AB Rh+" },
                                { label: "AB Rh-", value: "AB Rh-" },
                            ]}
                            name="blood_group"
                            label="Blood Group"
                        />
                        {editMode &&
                            <div className='flex justify-end'>
                                <Button callback={onSave} color="primary" type="submit"> Update Profile </Button>
                            </div>
                        }
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
