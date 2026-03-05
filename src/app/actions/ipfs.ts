"use server";

import axios from "axios";

/**
 * Uploads a file to Pinata IPFS.
 */
export async function uploadFileAction(formData: FormData) {
    try {
        const file = formData.get('file') as File;
        if (!file) throw new Error("No file provided");

        console.log(`Pinata: Uploading ${file.name} (${file.size} bytes)...`);

        const pinataFormData = new FormData();
        pinataFormData.append("file", file);

        // Optional metadata for Pinata dashboard
        const pinataMetadata = JSON.stringify({
            name: file.name,
        });
        pinataFormData.append("pinataMetadata", pinataMetadata);

        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", pinataFormData, {
            headers: {
                Authorization: `Bearer ${process.env.PINATA_JWT}`,
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Pinata: File upload success!", res.data.IpfsHash);
        return { success: true, cid: res.data.IpfsHash };
    } catch (error: any) {
        console.error("Pinata file upload error:", error.response?.data || error.message);
        return { success: false, error: error.response?.data?.error || error.message };
    }
}

/**
 * Uploads metadata (JSON) to Pinata IPFS.
 */
export async function uploadMetadataAction(metadata: any) {
    try {
        console.log("Pinata: Uploading metadata JSON...");

        const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS",
            {
                pinataContent: metadata,
                pinataMetadata: {
                    name: metadata.name || "NFT Metadata",
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PINATA_JWT}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Pinata: Metadata upload success!", res.data.IpfsHash);
        return { success: true, cid: res.data.IpfsHash };
    } catch (error: any) {
        console.error("Pinata metadata upload error:", error.response?.data || error.message);
        return { success: false, error: error.response?.data?.error || error.message };
    }
}
