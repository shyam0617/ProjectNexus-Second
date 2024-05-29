document.getElementById('formpassword').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('confirmpassword').value;
    const mobile = document.getElementById('mobile').value;
  
    // Basic validation
    if (password !== confirmpassword) {
        alert('Passwords do not match');
        return;
    }
  
    try {
        const response = await fetch('http://localhost:8000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, mobile })
        });
  
        if (response.ok) {
            alert('Registration successful');
        } else {
            const errorMessage = await response.text();
            alert('Registration failed: ' + errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while registering');
    }
  });
  