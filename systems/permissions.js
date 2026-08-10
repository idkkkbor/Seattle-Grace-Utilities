const PERMISSIONS = {

    FOUNDER: [
        "1533865253178183700"
    ],

    LEADERSHIP: [
        "1521106795832016928"
    ],

    ADMINISTRATION: [
        "1498677635767865415"
    ],

    HUMAN_RESOURCES: [
        "1489901563613937826"
    ],

    COMMUNITY_RELATIONS: [
        "1514605444528738384"
    ],

    CLINICAL_OPERATIONS: [
        "1515797638610681886"
    ]

};

function hasPermission(member, groups) {

    if (!Array.isArray(groups)) {
        groups = [groups];
    }

    const allowedRoles = [];

    for (const group of groups) {

        if (PERMISSIONS[group]) {
            allowedRoles.push(...PERMISSIONS[group]);
        }

    }

    return member.roles.cache.some(role =>
        allowedRoles.includes(role.id)
    );

}

module.exports = {
    hasPermission,
    PERMISSIONS
};
