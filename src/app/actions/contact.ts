"use server";

export async function submitContactAction(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // Server-side validation
    if (!name || !email || !subject || !message) {
        return { success: false, error: "All fields are required" };
    }

    if (!email.includes("@")) {
        return { success: false, error: "Invalid email address" };
    }

    // Simulate database/email service delay
    console.log("-----------------------------------------");
    console.log("NEW CONTACT FORM SUBMISSION:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);
    console.log("-----------------------------------------");

    await new Promise((r) => setTimeout(r, 1500));

    return {
        success: true,
        message: `Thanks ${name.split(" ")[0]}! We'll get back to you soon.`
    };
}
