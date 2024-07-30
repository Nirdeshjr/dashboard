" use client"
import React from 'react';
import Layout from '../components/Layout';
import UploadForm from './addpost';

const Post = () => {
    return (
        <>
            <Layout>
                <UploadForm/>
            </Layout>
        </>
    )
}

export default Post