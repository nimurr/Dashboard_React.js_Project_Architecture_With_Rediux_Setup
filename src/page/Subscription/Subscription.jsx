import React, { useState } from 'react';
import { Modal, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import subscriptionImage from '/public/category/category.png'; // You can replace with actual image for subscriptions
import { FaPlus } from 'react-icons/fa';
import { useCreateSubScriptionMutation, useDeleteSubScriptionMutation, useGetSubScriptionQuery, useUpdateScriptionMutation } from '../../redux/features/subscription/subscription';

const Subscription = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [subscriptionName, setSubscriptionName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('weekly');
    const [id, setId] = useState('');

    // console.log(description);

    const { data: getAllSubScription, isLoading } = useGetSubScriptionQuery();
    const [createSubScription] = useCreateSubScriptionMutation();
    const [updateSubScription] = useUpdateScriptionMutation();
    const [deleteSubScription] = useDeleteSubScriptionMutation();
    // console.log('subscription', getAllSubScription?.data);

    // Fake data for subscriptions
    const subscriptions = [
        {
            id: 1,
            name: 'Weekly Plan',
            price: '$5.50/week',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: subscriptionImage,
        },
        {
            id: 2,
            name: 'Monthly Plan',
            price: '$20/month',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: subscriptionImage,
        },
        {
            id: 3,
            name: 'Yearly Plan',
            price: '$200/year',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: subscriptionImage,
        },
    ];

    // Handle open modal for adding or editing
    const showModal = (edit = false, subscription = {}) => {
        console.log(subscription);
        setIsEditing(edit);
        setIsModalVisible(true);
        if (edit) {
            setSubscriptionName(subscription.name);
            setPrice(subscription.price);
            setDescription(subscription.details);
            setId(subscription.id); // Pre-fill for editing
        } else {
            setSubscriptionName('');
            setPrice('');
            setDescription('');
            setId(null);
        }
    };

    // Handle modal close
    const handleCancel = () => {
        setIsModalVisible(false);
        setSubscriptionName('');
        setPrice('');
        setDescription('');
    };

    // Handle form submit for adding/editing subscription
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!subscriptionName || !price || !description) {
            message.error('Please fill all fields!');
            return;
        }

        console.log('subscriptionName', subscriptionName, 'price', price, 'description', description, 'duration', duration);

        const formData = {
            name: subscriptionName,
            price: price,
            details: description,
            duration: duration
        }

        try {

            const res = await createSubScription(formData).unwrap();
            console.log(res);
            // if(res?.data?.error){
            //     message.error(res?.data?.error?.data?.message);
            // }
            if (res?.message) {
                message.success(res?.message);
                setDescription('');
                handleCancel();
            }


        } catch (error) {
            console.log(error);
            message.error('Something went wrong');
            setDescription('');
        }

        console.log('formData', formData);

        setDescription('');
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = {
            name: subscriptionName,
            price: price,
            details: description,
            duration: duration,
            id: id
        }

        try {

            const res = await updateSubScription(formData).unwrap();
            console.log(res);

            if (res?.message) {
                message.success(res?.message);
                setDescription('');
                handleCancel();
            }

        } catch (error) {
            console.log(error);
        }


        console.log('formData', formData);

        // setIsEditing(true);
        // showModal(true);
    };



    const handleDelete = async (subscription) => {
        console.log(subscription.id);

        try {
            const res = await deleteSubScription(subscription.id).unwrap();
            if (res?.message) {
                message.success(res?.message);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <section>
            <div className="w-full md:flex justify-end items-center py-6">
                <button
                    type="primary"
                    className=" text-xl px-2 md:px-5 py-3 bg-[#038c6d] text-white flex justify-center items-center gap-1 rounded md:mb-0"
                    onClick={() => showModal(false)}
                >
                    <FaPlus className='text-xl font-semibold text-white' />  Add Subscription
                </button>
            </div>

            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5">
                {getAllSubScription?.data?.map((subscription) => (
                    <div key={subscription.id} className="border-shadow pb-5 rounded-lg overflow-hidden">
                        <div>
                            <h2 className="my-5 text-3xl font-semibold text-center">{subscription.name}</h2>
                            <p className="text-center text-xl">${subscription.price} / {subscription.duration}</p>
                            <p className="my-5 px-5 text-base">{subscription.details}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 px-5">
                            <button onClick={() => handleDelete(subscription)} className="w-full py-3 px-6 border border-[#038c6d] rounded-lg" >
                                Delete
                            </button>
                            <button onClick={() => showModal(true, subscription)} className="w-full py-3 px-6 border bg-[#038c6d] text-white rounded-lg">
                                Edit Package
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for adding/editing subscription */}
            <Modal
                title={isEditing ? 'Edit Subscription' : 'Add Subscription'}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null} // Remove default cancel and ok buttons
            >
                <form onSubmit={isEditing ? handleUpdate : handleSubmit} action="">
                    <div className="mb-4">
                        <span className="block mb-2 font-semibold">Subscription Package name</span>
                        <Input
                            placeholder="Enter subscription name"
                            value={subscriptionName}
                            onChange={(e) => setSubscriptionName(e.target.value)}
                        />
                    </div>

                    <div className='my-3'>
                        <span className='block mb-2 font-semibold'>Subscription Duration</span>
                        <select className='w-full border border-gray-300 rounded-md p-2' onChange={(e) => setDuration(e.target.value)} name="duration" value={duration} id="" >
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <span className="block mb-2 font-semibold">Subscription Package Price</span>
                        <Input
                            placeholder="Enter price"
                            value={price}
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <span className="block mb-2 font-semibold">Subscription Package Details</span>
                        <textarea
                            className='w-full h-40 border border-gray-300 rounded-md p-2'
                            placeholder="Enter subscription description"
                            defaultValue={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                        />
                    </div>

                    <button
                        type="primary"
                        className="w-full py-3 bg-[#038c6d] text-white"
                    // onClick={handleSubmit}
                    >
                        {isEditing ? 'Update Subscription' : 'Add Subscription'}
                    </button>
                </form>


            </Modal>
        </section>
    );
};

export default Subscription;
