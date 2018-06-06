/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.example.mynetwork.Trade} tx
 * @transaction
 */
async function sampleTransaction(tx) {
    // Save the old value of the asset.
    const oldOwner = tx.land.owner.personId;

    // Update the asset with the new value.
    tx.land.owner.personId = tx.newOwner.personId;
    const currentUser=tx.user.userId;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.example.mynetwork.Land');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.land);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.example.mynetwork', 'Sold');
    event.asset = tx.land;
    event.user = tx.user;
    event.oldOwner = oldOwner;
    event.newOwner = tx.newOwner;
    emit(event);
}
