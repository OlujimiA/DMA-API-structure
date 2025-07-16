const orgService = require('../services/orgServices.js');
const { sendSuccess, sendError } = require('../utils/response');

exports.getAllorgs = async (req, res) => {
  try {
    const orgs = await orgService.getAllorgs();
    if (!orgs) return sendError(res, 404, 'Oganisations not found');
    return sendSuccess(res, 200, orgs);
  } catch (err) {
    return sendError(res, 500, 'Could not fetch organisations', err.message);
  }
};

exports.getorgById = async (req, res) => {
  try {
    const org = await orgService.getorgById(req.params.id);
    if (!org) return sendError(res, 404, 'organisation not found');
    
    return sendSuccess(res, 200, org);

  } catch (err){
    return sendError(res, 500, 'Server error', err.message);
  }
  
};

exports.createOrg = async (req, res) => {
  try {
    const { name, email, address, country, type, industry, rc_number, staff_size, logo_url, user_id } = req.body;

    if ( !name || !email || !address || !country || !type || !industry || !rc_number || !staff_size || !logo_url || !user_id) {
      return sendError(res, 400, 'All fields are required - name, email, address, country, type, industry, rc_number, staff_size, logo_url, user_id');
    }

    const newOrg = await orgService.createOrg({
      name,
      email,
      address,
      country,
      type,
      industry,
      rc_number,
      staff_size,
      logo_url,
      user_id
    });

    return sendSuccess(res, 201, { Org: newOrg }, 'Org created successfully');
  } catch (err) {
    return sendError(res, 500, 'Could not create Organisation', err.message);
  }
};

exports.updateOrg = async (req, res) => {
  try {
    const { name, email, address, country, type, industry, rc_number, staff_size, logo_url } = req.body;
    const { id } = req.params;

    if ( !name || !email || !address || !country || !type || !industry || !rc_number || !staff_size || !logo_url ) {
      return sendError(res, 400, 'All fields are required - All fields are required - name, email, address, country, type, industry, rc_number, staff_size, logo_url');
    }

    const updated = await orgService.updateOrg(id, { name, email, address, country, type, industry, rc_number, staff_size, logo_url });

    if (!updated) {
      return sendError(res, 404, 'Organisation not found');
    }

    return sendSuccess(res, 200, { Organisation: updated }, 'Organisation updated successfully');
  } catch (err) {
    return sendError(res, 500, 'Could not update organisation', err.message);
  }
};

exports.deleteOrg = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await orgService.deleteOrg(id);

    if (!deleted) {
      return sendError(res, 404, 'Organisation not found');
    }

    return sendSuccess(res, 200, { Organisation: deleted }, 'Organisation deleted successfully');
  } catch (err) {
    return sendError(res, 500, 'Could not delete Organisation', err.message);
  }
};

exports.createContact = async (req, res) => {
  try {
    const { name, pfp_url, doc_url, organisation_id } = req.body;
    if (!name || !pfp_url || !doc_url || !organisation_id){
      return sendError(res, 400, 'All fields are required - name, pfp_url, doc_url, organisation_id');
    }

    const newContact = await orgService.createContact({ name, pfp_url, doc_url, organisation_id });

    return sendSuccess(res, 201, { Contact: newContact }, 'Organisation contact created successfully');

  } catch (err) {
    return sendError(res, 500, 'Failed to create a Contact profile', err.message);
  }
};

exports.getAllContacts = async (req, res) => {
  try{
    const contacts = await orgService.getAllContacts();
    if (contacts.length===0) return sendError(res, 404, 'No contacts found');

    return sendSuccess(res, 200, contacts);
  } catch (err) {
    return sendError(res, 500, 'Failed to get contacts', err.message);
  }
};

exports.getContact = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await orgService.getContact(id);
    if (!contact) return sendError(res, 404, 'Contact not found');

    return sendSuccess(res, 200, contact, 'Contact fetched successfully!');
  } catch (err) {
    return sendError(res, 500, 'Failed to get the contact', err.message);
  }
};