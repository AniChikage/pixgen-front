
"use client";
import { RedocStandalone } from 'redoc';

function APIPage() {
    return (
        <RedocStandalone specUrl="/assets/swagger.json"/>
    )
}

export default APIPage;