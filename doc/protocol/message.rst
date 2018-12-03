Message
-------

A run has minimum 3 shufflers. The protocol defines a well known shuffle order,
so each shuffler is one of:

* First. Here called F.
* Inner. Not first or last. Here called I.
* Last. Here called L.

A session has 5 main phases. Each phase defines a single message. Some subset
of shufflers (potentially all) send an instance of the message in each phase.
The messages sent by each shuffler are:

=  =  =
F  I  L
=  =  =
1  1  1
2  2  \
\  \  3
4  4  4
5  5  5
=  =  =

Message 1
^^^^^^^^^

Reveals the encryption public key of the sender.

Packaged into a `Packets` for transfer:

* ``packet`` - Unary list of single `Signed`.

The single `Signed` contains:

* ``signature``

    * ``signature`` - Packet signature by sender.

* ``packet``

    * ``session`` - Session identifier.
    * ``number`` - Sender pool number.
    * ``from_key``

        * ``key`` - Sender signing public key.

    * ``phase`` - Phase 1 identifier.
    * ``message``

        * ``key``

            * ``key`` - Sender encryption public key.

Message 2
^^^^^^^^^

Delivers an encrypted output list to the next shuffler.

Packaged into a `Packets` for transfer:

* ``packet`` - List of `Signed`. One packet per output list item.

Each `Signed` contains a single output list item:

* ``signature``

    * ``signature`` - Packet signature by sender.

* ``packet``

    * ``session`` - Session identifier.
    * ``number`` - Sender pool number.
    * ``from_key``

        * ``key`` - Sender signing public key.

    * ``to_key``

        * ``key`` - Recipient signing public key.

    * ``phase`` - Phase 2 identifier.
    * ``message``

        * ``str`` - Encrypted output list item.

Message 3
^^^^^^^^^

Broadcasts the unencrypted final output list.

Packaged into a `Packets` for transfer:

* ``packet`` - List of `Signed`. One packet per output list item.

Each `Signed` contains a single output list item:

* ``signature``

    * ``signature`` - Packet signature by sender.

* ``packet``

    * ``session`` - Session identifier.
    * ``number`` - Sender pool number.
    * ``from_key``

        * ``key`` - Sender signing public key.

    * ``phase`` - Phase 3 identifier.
    * ``message``

        * ``str`` - Unencrypted final output list item.

Message 4
^^^^^^^^^

Broadcasts a final output list digest for an equivocation check.

Packaged into a `Packets` for transfer:

* ``packet`` - Unary list of single `Signed`.

The single `Signed` contains:

* ``signature``

    * ``signature`` - Packet signature by sender.

* ``packet``

    * ``session`` - Session identifier.
    * ``number`` - Sender pool number.
    * ``from_key``

        * ``key`` - Sender signing public key.

    * ``phase`` - Phase 4 identifier.
    * ``message``

        * ``hash``

            * ``hash`` - Output list digest.

Message 5
^^^^^^^^^

Broadcasts signature of the final Bitcoin Cash shuffle transaction.

Packaged into a `Packets` for transfer:

* ``packet`` - Unary list of single `Signed`.

The single `Signed` contains:

* ``signature``

    * ``signature`` - Packet signature by sender.

* ``packet``

    * ``session`` - Session identifier.
    * ``number`` - Sender pool number.
    * ``from_key``

        * ``key`` - Sender signing public key.

    * ``phase`` - Phase 5 identifier.
    * ``message``

        * ``signatures`` - List of `InputSignature`.

Each `InputSignature` contains a single input signature:

* ``index`` - Input index.
* ``signature``

    * ``signature`` - Input signature.
