async function loadUsers() {
    try {
        const users = (await axios.get("/center-user/api/users"))?.data?.users;
        console.log(users);
        if (users && Array.isArray(users)) {
            let str = `<div class="Rtable-row Rtable-row--head">
                            <div class="Rtable-cell date-cell column-heading">Email</div>
                            <div class="Rtable-cell topic-cell column-heading">Role</div>
                            <div class="Rtable-cell access-link-cell column-heading">Status</div>
                        </div>`;
            users.forEach((user, index) => {
                const className = index % 2 == 0 ? 'is-striped' : '';
                str += `<div class="Rtable-row ${className}">
                <div class="Rtable-cell date-cell">
                    <div class="Rtable-cell--content date-content"><span class="webinar-date">${user.email}</span>
                    </div>
                </div>
                <div class="Rtable-cell topic-cell">
                    <div class="Rtable-cell--content title-content">${user.role}</div>
                </div>
                <div class="Rtable-cell access-link-cell">
                    <div class="Rtable-cell--content access-link-content hlink" onclick="changeActive(${user.id})">${user.active ? 'Disable' : 'Enable'}</div>
                </div>
            </div>`;
            });
            const ls = document.getElementById('user-list');
            ls.innerHTML = str;
        }

    } catch (error) {
        if (error?.response?.data?.message) {
            error.message = error.response?.data?.message;
        }
        launch_toast(error.message);
    }
}

async function changeActive(userId) {
    try {
        const result = (await axios.patch(`/center-user/api/user/${userId}/status`));
        console.log(result);
        loadUsers();
    } catch (error) {
        if (error?.response?.data?.message) {
            error.message = error.response?.data?.message;
        }
        launch_toast(error.message);
    }
}